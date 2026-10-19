import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleAuthProvider } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { UserProfile, DEFAULT_USER_PROFILE } from '../types/user';

export interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile;
  loading: boolean;
  isFirebaseConnected: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const local = localStorage.getItem('careeros_profile');
      if (local) return JSON.parse(local);
    } catch {}
    return DEFAULT_USER_PROFILE;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Sync or retrieve user record in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const profileDocRef = doc(db, 'profiles', user.uid);

        try {
          const userSnap = await getDoc(userDocRef);
          if (!userSnap.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || 'CareerOS Learner',
              photoURL: user.photoURL || '',
              role: 'student',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }

          const profileSnap = await getDoc(profileDocRef);
          if (profileSnap.exists()) {
            const data = profileSnap.data();
            setUserProfile((prev) => ({
              ...prev,
              name: data.name || user.displayName || prev.name,
              careerGoal: data.careerGoal || prev.careerGoal,
              currentLevel: data.currentLevel || prev.currentLevel,
              availableTime: data.availableTime || prev.availableTime,
              urgency: data.urgency || prev.urgency,
              careerClarity: data.careerClarity || prev.careerClarity,
              primaryWorry: data.primaryWorry || prev.primaryWorry,
              preferredLearningStyle: data.preferredLearningStyle || prev.preferredLearningStyle,
            }));
          } else {
            // Seed profile doc in Firestore with existing profile info
            await setDoc(profileDocRef, {
              userId: user.uid,
              name: user.displayName || userProfile.name || 'Jordan',
              careerGoal: userProfile.careerGoal || 'Full-Stack Software & Product Engineering',
              currentLevel: userProfile.currentLevel || 'Level 1: Foundation Builder',
              availableTime: userProfile.availableTime || '5-8 hours / week',
              urgency: userProfile.urgency || 'Medium (Next 3-6 months)',
              careerClarity: userProfile.careerClarity || 'Rough direction, exploring options',
              primaryWorry: userProfile.primaryWorry || 'Lack of formal industry experience',
              preferredLearningStyle: userProfile.preferredLearningStyle || 'Hands-on task with instant feedback',
              isPublic: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
          setIsFirebaseConnected(true);
        } catch (err) {
          console.warn('Firestore initial user sync warning:', err);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setIsFirebaseConnected(true);
    } catch (error: any) {
      console.error('Google Sign-In failed:', error);
      setIsFirebaseConnected(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Sign-Out failed:', error);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    const merged = { ...userProfile, ...updates };
    setUserProfile(merged);
    try {
      localStorage.setItem('careeros_profile', JSON.stringify(merged));
    } catch {}

    if (currentUser) {
      const profileDocRef = doc(db, 'profiles', currentUser.uid);
      try {
        await setDoc(
          profileDocRef,
          {
            userId: currentUser.uid,
            name: merged.name,
            careerGoal: merged.careerGoal,
            currentLevel: merged.currentLevel,
            availableTime: merged.availableTime,
            urgency: merged.urgency,
            careerClarity: merged.careerClarity,
            primaryWorry: merged.primaryWorry,
            preferredLearningStyle: merged.preferredLearningStyle,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `profiles/${currentUser.uid}`);
      }
    }
  };

  const value = useMemo(
    () => ({
      currentUser,
      userProfile,
      loading,
      isFirebaseConnected,
      signInWithGoogle,
      logout,
      updateUserProfile,
    }),
    [currentUser, userProfile, loading, isFirebaseConnected]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
