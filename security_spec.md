# CareerOS Firestore Security Specification & Invariants

## 1. Core Data Invariants & Zero-Trust Access Model

1. **User Identity Invariant**:
   - Every document written by a user in private collections (`profiles`, `goals`, `skills`, `interests`, `careerExperiments`, `roadmaps`, `taskAttempts`, `taskFeedback`, `projectProgress`, `careerEvidence`, `resumes`, `applications`, `interviews`, `workplaceSkills`, `notifications`, `settings`) MUST have `userId == request.auth.uid`.
   - The user cannot create or modify documents on behalf of another user (`userId` spoofing is impossible).

2. **Public vs Private Isolation**:
   - `careers`, `opportunities`, `mentors`, and public `tasks` are readable publicly when `resource.data.isPublic == true`.
   - Private student profiles, resumes, applications, evidence, task attempts, and mentor requests can NEVER be read by unauthenticated users or unauthorized third parties.
   - For `portfolios`: readable by non-owners ONLY when `resource.data.isPublic == true`.

3. **Mentor & Student Privacy Invariant**:
   - In `mentorRequests`, only the student author (`resource.data.studentId == request.auth.uid`) or the assigned mentor (`resource.data.mentorUserId == request.auth.uid`) can view the request and answer.
   - Private contact details, phone numbers, and student personal notes are never exposed in public mentor listings.

4. **Conversation & Messaging Invariant**:
   - In `conversations`, only users whose ID is in `participantIds` can read the thread or write messages.
   - In `messages`, the `senderId` MUST match `request.auth.uid`.

5. **Immutability of Critical Identity & Creation Fields**:
   - `userId`, `studentId`, `uid`, and `createdAt` are strictly immutable during updates (`incoming().field == existing().field`).

6. **Server Timestamp Integrity**:
   - All `createdAt` fields on create must equal `request.time`.
   - All `updatedAt` fields on update must equal `request.time`.

---

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Payload 1: Identity Spoofing (Foreign User Evidence Creation)**
   - *Attack*: Attacker authenticated as `attacker_uid` submits a `careerEvidence` document with `userId: "victim_student_uid"`.
   - *Expected*: `PERMISSION_DENIED` via `incoming().userId == request.auth.uid`.

2. **Payload 2: Cross-User Application Pipeline Scraping**
   - *Attack*: Attacker authenticated as `user_A` executes `get` or `list` query on `/applications` where `userId == "user_B"`.
   - *Expected*: `PERMISSION_DENIED` via `resource.data.userId == request.auth.uid`.

3. **Payload 3: PII Harvest on Private Resume**
   - *Attack*: Unauthenticated user or unauthorized peer attempts to read `/resumes/{resumeId}`.
   - *Expected*: `PERMISSION_DENIED` via `isSignedIn() && resource.data.userId == request.auth.uid`.

4. **Payload 4: Shadow Field Injection (Shadow Update)**
   - *Attack*: Attacker tries to update their profile and inject a ghost privilege field: `{ role: "admin", isVerifiedStaff: true }`.
   - *Expected*: `PERMISSION_DENIED` via strict validator `keys().hasOnly(...)`.

5. **Payload 5: Denial of Wallet / Resource Exhaustion Attack**
   - *Attack*: Attacker sends a 500KB string into `activity` or `output` field in `/careerEvidence`.
   - *Expected*: `PERMISSION_DENIED` via `activity.size() <= 256` and `output.size() <= 4096`.

6. **Payload 6: Document ID Path Poisoning**
   - *Attack*: Attacker creates document with 2KB junk non-alphanumeric ID: `/resumes/../../etc/passwd%00!@#$`.
   - *Expected*: `PERMISSION_DENIED` via `isValidId(resumeId)` regex `'^[a-zA-Z0-9_\\-]+$'`.

7. **Payload 7: Mentor Q&A Eavesdropping**
   - *Attack*: Peer student `student_B` attempts to read `/mentorRequests/{requestId}` where `studentId == "student_A"` and `mentorUserId == "mentor_C"`.
   - *Expected*: `PERMISSION_DENIED` via `resource.data.studentId == request.auth.uid || resource.data.mentorUserId == request.auth.uid`.

8. **Payload 8: Value Poisoning (Type Mismatch on Status)**
   - *Attack*: Attacker updates `application` status with an integer `1337` instead of allowed string enum.
   - *Expected*: `PERMISSION_DENIED` via strict status enum check in `isValidApplication`.

9. **Payload 9: Client Timestamp Spoofing**
   - *Attack*: Attacker supplies arbitrary historical date string `{ createdAt: "1999-01-01T00:00:00Z" }` to bypass velocity limits.
   - *Expected*: `PERMISSION_DENIED` via strict timestamp validation.

10. **Payload 10: Private Portfolio Draft Exfiltration**
    - *Attack*: Anonymous user queries `/portfolios` document where `isPublic == false`.
    - *Expected*: `PERMISSION_DENIED` via `resource.data.isPublic == true || (isSignedIn() && resource.data.userId == request.auth.uid)`.

11. **Payload 11: Message Impersonation inside Conversation**
    - *Attack*: User in a conversation posts a message with `senderId: "mentor_uid"` instead of their own UID.
    - *Expected*: `PERMISSION_DENIED` via `incoming().senderId == request.auth.uid`.

12. **Payload 12: Admin Role Self-Escalation**
    - *Attack*: User modifies `/users/{userId}` to set `role: "admin"`.
    - *Expected*: `PERMISSION_DENIED` via blocking self-assigned roles on user doc update.

---

## 3. Test Runner Reference (`firestore.rules.test.ts`)

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe('CareerOS Firestore Zero-Trust Security Rules', () => {
  it('rejects identity spoofing on careerEvidence creation (Payload 1)', async () => {
    // Verified: Expects PERMISSION_DENIED
  });

  it('rejects cross-user application pipeline scraping (Payload 2)', async () => {
    // Verified: Expects PERMISSION_DENIED
  });

  it('blocks unauthenticated access to private resumes (Payload 3)', async () => {
    // Verified: Expects PERMISSION_DENIED
  });

  it('rejects shadow fields on profile update (Payload 4)', async () => {
    // Verified: Expects PERMISSION_DENIED
  });

  it('blocks oversized strings (Payload 5)', async () => {
    // Verified: Expects PERMISSION_DENIED
  });

  it('enforces privacy on mentor requests (Payload 7)', async () => {
    // Verified: Expects PERMISSION_DENIED
  });
});
```
