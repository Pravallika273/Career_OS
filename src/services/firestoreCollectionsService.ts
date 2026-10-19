import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';

/**
 * Validates document ID to prevent ID poisoning
 */
export function assertValidId(id: string): void {
  if (!id || typeof id !== 'string' || id.length > 128 || !/^[a-zA-Z0-9_\-]+$/.test(id)) {
    throw new Error(`Invalid Firestore document ID: "${id}". Must be alphanumeric, underscores, or hyphens up to 128 chars.`);
  }
}

// -------------------------------------------------------------
// 1. Users Collection
// -------------------------------------------------------------
export async function fetchUserDoc(userId: string) {
  assertValidId(userId);
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${userId}`);
  }
}

export async function saveUserDoc(userId: string, data: Record<string, any>) {
  assertValidId(userId);
  try {
    await setDoc(doc(db, 'users', userId), {
      ...data,
      uid: userId,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}`);
  }
}

// -------------------------------------------------------------
// 2. Profiles Collection
// -------------------------------------------------------------
export async function fetchProfileDoc(profileId: string) {
  assertValidId(profileId);
  try {
    const snap = await getDoc(doc(db, 'profiles', profileId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `profiles/${profileId}`);
  }
}

export async function saveProfileDoc(profileId: string, data: Record<string, any>) {
  assertValidId(profileId);
  try {
    await setDoc(doc(db, 'profiles', profileId), {
      ...data,
      userId: profileId,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `profiles/${profileId}`);
  }
}

// -------------------------------------------------------------
// 3. Goals Collection
// -------------------------------------------------------------
export async function fetchUserGoals(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'goals'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'goals');
  }
}

export async function createGoalDoc(data: Record<string, any>) {
  try {
    const ref = await addDoc(collection(db, 'goals'), {
      ...data,
      userId: auth.currentUser?.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return ref.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'goals');
  }
}

// -------------------------------------------------------------
// 4. Skills Collection
// -------------------------------------------------------------
export async function fetchUserSkills(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'skills'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'skills');
  }
}

export async function saveSkillDoc(skillId: string, data: Record<string, any>) {
  assertValidId(skillId);
  try {
    await setDoc(doc(db, 'skills', skillId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `skills/${skillId}`);
  }
}

// -------------------------------------------------------------
// 5. Interests Collection
// -------------------------------------------------------------
export async function fetchUserInterests(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'interests'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'interests');
  }
}

export async function saveInterestDoc(interestId: string, data: Record<string, any>) {
  assertValidId(interestId);
  try {
    await setDoc(doc(db, 'interests', interestId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `interests/${interestId}`);
  }
}

// -------------------------------------------------------------
// 6. Careers Collection
// -------------------------------------------------------------
export async function fetchPublicCareers() {
  try {
    const q = query(collection(db, 'careers'), where('isPublic', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'careers');
  }
}

// -------------------------------------------------------------
// 7. CareerExperiments Collection
// -------------------------------------------------------------
export async function fetchUserExperiments(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'careerExperiments'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'careerExperiments');
  }
}

export async function createCareerExperimentDoc(data: Record<string, any>) {
  try {
    const ref = await addDoc(collection(db, 'careerExperiments'), {
      ...data,
      userId: auth.currentUser?.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return ref.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'careerExperiments');
  }
}

// -------------------------------------------------------------
// 8. Roadmaps Collection
// -------------------------------------------------------------
export async function fetchUserRoadmaps(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'roadmaps'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'roadmaps');
  }
}

export async function saveRoadmapDoc(roadmapId: string, data: Record<string, any>) {
  assertValidId(roadmapId);
  try {
    await setDoc(doc(db, 'roadmaps', roadmapId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `roadmaps/${roadmapId}`);
  }
}

// -------------------------------------------------------------
// 9. Tasks Collection
// -------------------------------------------------------------
export async function fetchTasks(userId?: string) {
  try {
    const q = userId
      ? query(collection(db, 'tasks'), where('userId', '==', userId))
      : query(collection(db, 'tasks'), where('isPublic', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'tasks');
  }
}

export async function saveTaskDoc(taskId: string, data: Record<string, any>) {
  assertValidId(taskId);
  try {
    await setDoc(doc(db, 'tasks', taskId), {
      ...data,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `tasks/${taskId}`);
  }
}

// -------------------------------------------------------------
// 10. TaskAttempts Collection
// -------------------------------------------------------------
export async function fetchUserTaskAttempts(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'taskAttempts'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'taskAttempts');
  }
}

export async function saveTaskAttemptDoc(attemptId: string, data: Record<string, any>) {
  assertValidId(attemptId);
  try {
    await setDoc(doc(db, 'taskAttempts', attemptId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `taskAttempts/${attemptId}`);
  }
}

// -------------------------------------------------------------
// 11. TaskFeedback Collection
// -------------------------------------------------------------
export async function fetchUserTaskFeedback(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'taskFeedback'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'taskFeedback');
  }
}

export async function recordTaskFeedbackDoc(data: Record<string, any>) {
  try {
    const ref = await addDoc(collection(db, 'taskFeedback'), {
      ...data,
      userId: auth.currentUser?.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return ref.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'taskFeedback');
  }
}

// -------------------------------------------------------------
// 12. Projects Collection
// -------------------------------------------------------------
export async function fetchProjects(userId?: string) {
  try {
    const q = userId
      ? query(collection(db, 'projects'), where('userId', '==', userId))
      : query(collection(db, 'projects'), where('isPublic', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'projects');
  }
}

// -------------------------------------------------------------
// 13. ProjectProgress Collection
// -------------------------------------------------------------
export async function fetchUserProjectProgress(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'projectProgress'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'projectProgress');
  }
}

export async function saveProjectProgressDoc(progressId: string, data: Record<string, any>) {
  assertValidId(progressId);
  try {
    await setDoc(doc(db, 'projectProgress', progressId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `projectProgress/${progressId}`);
  }
}

// -------------------------------------------------------------
// 14. CareerEvidence Collection
// -------------------------------------------------------------
export async function fetchUserCareerEvidence(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'careerEvidence'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'careerEvidence');
  }
}

export async function addCareerEvidenceDoc(data: Record<string, any>) {
  try {
    const ref = await addDoc(collection(db, 'careerEvidence'), {
      ...data,
      userId: auth.currentUser?.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return ref.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'careerEvidence');
  }
}

// -------------------------------------------------------------
// 15. Portfolios Collection
// -------------------------------------------------------------
export async function fetchUserPortfolios(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'portfolios'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'portfolios');
  }
}

export async function savePortfolioDoc(portfolioId: string, data: Record<string, any>) {
  assertValidId(portfolioId);
  try {
    await setDoc(doc(db, 'portfolios', portfolioId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `portfolios/${portfolioId}`);
  }
}

// -------------------------------------------------------------
// 16. Resumes Collection
// -------------------------------------------------------------
export async function fetchUserResumes(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'resumes'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'resumes');
  }
}

export async function saveResumeDoc(resumeId: string, data: Record<string, any>) {
  assertValidId(resumeId);
  try {
    await setDoc(doc(db, 'resumes', resumeId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `resumes/${resumeId}`);
  }
}

// -------------------------------------------------------------
// 17. Applications Collection
// -------------------------------------------------------------
export async function fetchUserApplications(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'applications'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'applications');
  }
}

export async function createApplicationDoc(data: Record<string, any>) {
  try {
    const ref = await addDoc(collection(db, 'applications'), {
      ...data,
      userId: auth.currentUser?.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return ref.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'applications');
  }
}

export async function updateApplicationDoc(appId: string, updates: Record<string, any>) {
  assertValidId(appId);
  try {
    await updateDoc(doc(db, 'applications', appId), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `applications/${appId}`);
  }
}

// -------------------------------------------------------------
// 18. Opportunities Collection
// -------------------------------------------------------------
export async function fetchPublicOpportunities() {
  try {
    const q = query(collection(db, 'opportunities'), where('isPublic', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'opportunities');
  }
}

// -------------------------------------------------------------
// 19. Interviews Collection
// -------------------------------------------------------------
export async function fetchUserInterviews(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'interviews'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'interviews');
  }
}

export async function saveInterviewDoc(interviewId: string, data: Record<string, any>) {
  assertValidId(interviewId);
  try {
    await setDoc(doc(db, 'interviews', interviewId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `interviews/${interviewId}`);
  }
}

// -------------------------------------------------------------
// 20. WorkplaceSkills Collection
// -------------------------------------------------------------
export async function fetchUserWorkplaceSkills(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'workplaceSkills'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'workplaceSkills');
  }
}

export async function saveWorkplaceSkillDoc(skillResolutionId: string, data: Record<string, any>) {
  assertValidId(skillResolutionId);
  try {
    await setDoc(doc(db, 'workplaceSkills', skillResolutionId), {
      ...data,
      userId: auth.currentUser?.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `workplaceSkills/${skillResolutionId}`);
  }
}

// -------------------------------------------------------------
// 21. Mentors Collection
// -------------------------------------------------------------
export async function fetchPublicMentors() {
  try {
    const q = query(collection(db, 'mentors'), where('isPublic', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'mentors');
  }
}

// -------------------------------------------------------------
// 22. MentorRequests Collection
// -------------------------------------------------------------
export async function fetchUserMentorRequests(studentId: string) {
  assertValidId(studentId);
  try {
    const q = query(collection(db, 'mentorRequests'), where('studentId', '==', studentId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'mentorRequests');
  }
}

export async function submitMentorRequestDoc(data: Record<string, any>) {
  try {
    const ref = await addDoc(collection(db, 'mentorRequests'), {
      ...data,
      studentId: auth.currentUser?.uid,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return ref.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'mentorRequests');
  }
}

// -------------------------------------------------------------
// 23 & 24. Conversations & Messages Collection
// -------------------------------------------------------------
export async function fetchUserConversations(userId: string) {
  assertValidId(userId);
  try {
    const q = query(
      collection(db, 'conversations'),
      where('participantIds', 'array-contains', userId)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'conversations');
  }
}

export async function fetchConversationMessages(conversationId: string) {
  assertValidId(conversationId);
  try {
    const snap = await getDocs(collection(db, 'conversations', conversationId, 'messages'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, `conversations/${conversationId}/messages`);
  }
}

export async function sendConversationMessageDoc(
  conversationId: string,
  text: string
) {
  assertValidId(conversationId);
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Authentication required to send messages');

    const msgRef = await addDoc(
      collection(db, 'conversations', conversationId, 'messages'),
      {
        conversationId,
        senderId: user.uid,
        senderName: user.displayName || 'CareerOS Learner',
        text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );

    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessageSnippet: text.slice(0, 100),
      lastMessageAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return msgRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `conversations/${conversationId}/messages`);
  }
}

// -------------------------------------------------------------
// 25. Notifications Collection
// -------------------------------------------------------------
export async function fetchUserNotifications(userId: string) {
  assertValidId(userId);
  try {
    const q = query(collection(db, 'notifications'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'notifications');
  }
}

export async function markNotificationReadDoc(notificationId: string) {
  assertValidId(notificationId);
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      isRead: true,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `notifications/${notificationId}`);
  }
}

// -------------------------------------------------------------
// 26. Settings Collection
// -------------------------------------------------------------
export async function fetchUserSettingsDoc(userId: string) {
  assertValidId(userId);
  try {
    const snap = await getDoc(doc(db, 'settings', userId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `settings/${userId}`);
  }
}

export async function saveUserSettingsDoc(userId: string, data: Record<string, any>) {
  assertValidId(userId);
  try {
    await setDoc(doc(db, 'settings', userId), {
      ...data,
      userId,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `settings/${userId}`);
  }
}
