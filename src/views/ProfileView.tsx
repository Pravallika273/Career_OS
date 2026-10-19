import React, { useState } from 'react';
import { User, Mail, MapPin, GraduationCap, Clock, Target, AlertTriangle, ShieldCheck, Save, Globe, Sliders } from 'lucide-react';
import { UserProfile } from '../types/user';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import { useTranslation } from '../context/I18nContext';
import { GlobalPreferencesModal } from '../components/global/GlobalPreferencesModal';

export interface ProfileViewProps {
  userProfile?: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const { toast } = useToast();
  const { educationMeta, marketMeta, regionalTerms, t } = useTranslation();
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);

  const [profile, setProfile] = useState<UserProfile>(
    userProfile || {
      name: 'Jordan',
      email: 'jordan@example.com',
      location: '',
      education: 'Undergraduate',
      degree: 'Computer Science & Design',
      graduationStage: 'Final year',
      careerSituation: 'Fresher / early beginner',
      careerGoal: 'Full-Stack Software & Product Engineering',
      currentLevel: 'Level 1: Foundation Builder',
      careerClarity: 'Rough direction',
      skills: ['HTML & CSS', 'JavaScript', 'Problem Solving'],
      interests: ['Web Development', 'UI Engineering'],
      availableTime: '5-8 hours / week',
      urgency: 'Medium (Next 3-6 months)',
      concerns: ["I don't have experience."],
      confidence: 'Cautious but motivated',
      preferredLearningStyle: 'Practical tasks with concrete examples',
      definitionOfSuccess: 'Building tangible proof and landing my first internship',
      needRightNow: 'I want to learn and gain experience first.',
      primaryWorry: "I don't have experience.",
    }
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profile);
    toast.success('Profile Updated', 'Your personalized starting point and academic context have been saved.');
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="indigo" size="sm">
              Your Profile
            </Badge>
            <span className="text-xs text-[#667085]">Personalized Starting Point</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#101828]">
            {profile.name}&apos;s Career Space
          </h1>
          <p className="text-sm text-[#475467] mt-0.5">
            CareerOS evaluates demonstrated proof and skills. We adapt to your regional background, academic model, or self-taught path.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsGlobalModalOpen(true)}
            leftIcon={<Globe className="w-3.5 h-3.5 text-[#5B5BD6]" />}
          >
            Regional Settings
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Academic System Context Banner */}
      <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E8E6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-white border border-[#E8E6DF] text-[#F37021]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#101828]">
              Academic Context: {educationMeta.label} ({educationMeta.region})
            </p>
            <p className="text-[11px] text-[#667085] mt-0.5">
              Grading: {educationMeta.gradingScale} · Target Market: {marketMeta.label}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsGlobalModalOpen(true)}
          className="text-xs font-semibold text-[#5B5BD6] hover:underline self-start sm:self-auto"
        >
          Change education system
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Identity & Context */}
        <Card variant="default" padding="lg" className="space-y-4 bg-white">
          <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider pb-2 border-b border-[#E8E6DF]">
            Identity & Education
          </h3>
          <Input
            label="Name / Nickname"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            label="Location"
            placeholder="e.g. Bangalore, London, São Paulo, Remote"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          />
          <Input
            label={regionalTerms.degreeTerm}
            placeholder="e.g. B.Tech Computer Science, BSc Honours, Self-Taught Web Dev"
            value={profile.degree}
            onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#344054]">
              {regionalTerms.graduationYearTerm} / Academic Stage
            </label>
            <select
              value={profile.graduationStage}
              onChange={(e) => setProfile({ ...profile, graduationStage: e.target.value })}
              className="w-full bg-white border border-[#E8E6DF] rounded-xl px-3 py-2 text-xs font-medium text-[#101828] focus:border-[#5B5BD6] focus:outline-none"
            >
              {educationMeta.typicalStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Career Direction & Preferences */}
        <Card variant="default" padding="lg" className="space-y-4 bg-white">
          <h3 className="text-sm font-semibold text-[#101828] uppercase tracking-wider pb-2 border-b border-[#E8E6DF]">
            Career Compass
          </h3>
          <Input
            label="Current Goal"
            value={profile.careerGoal}
            onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
          />
          <Input
            label="Current Level"
            value={profile.currentLevel}
            onChange={(e) => setProfile({ ...profile, currentLevel: e.target.value })}
          />
          <Input
            label="Available Time"
            value={profile.availableTime}
            onChange={(e) => setProfile({ ...profile, availableTime: e.target.value })}
          />
          <Input
            label="Career Urgency"
            value={profile.urgency}
            onChange={(e) => setProfile({ ...profile, urgency: e.target.value })}
          />
          <Input
            label="Primary Worry / Obstacle"
            value={profile.primaryWorry}
            onChange={(e) => setProfile({ ...profile, primaryWorry: e.target.value })}
            hint="CareerOS adapts daily tasks to overcome this specific hurdle."
          />
        </Card>
      </form>

      {/* Global Preferences Modal */}
      <GlobalPreferencesModal
        isOpen={isGlobalModalOpen}
        onClose={() => setIsGlobalModalOpen(false)}
      />
    </div>
  );
};
