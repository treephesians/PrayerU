import ProfileHeader from '@/components/shares/ProfileHeader';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(params.id);

    // onboard하지 않은 user는 onboarding 페이지로 이동
    if (!userInfo?.onboarded) redirect('/onboarding');

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}>
            </ProfileHeader>
        </section>
    )
}

export default Page;