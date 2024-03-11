import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page() {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    // onboard하지 않은 user는 onboarding 페이지로 이동
    if(!userInfo?.onboarded) redirect('/onboarding');
    
    return (

        <>
            <h1 className="head-text">Create Pray</h1>
            <PostThread userId={userInfo._id} />
        </>
    
    )
}

export default Page;