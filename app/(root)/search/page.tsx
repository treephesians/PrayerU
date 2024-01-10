import ProfileHeader from '@/components/shares/ProfileHeader';
import { fetchUser, fetchUserPosts, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { profileTabs } from '@/constants';
import Image from "next/image";
import ThreadsTab from '@/components/shares/ThreadsTab';
import UserCard from '@/components/cards/UserCard';

async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    // onboard하지 않은 user는 onboarding 페이지로 이동
    if (!userInfo?.onboarded) redirect('/onboarding');

    // Fetch Users
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 24
    })
    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>
            {/* search bar */}

            <div className='mt-14 flex flex-col gap-9'>
                {result.users.length === 0 ? (
                    <p className='no-result'>No users</p>
                ) : (
                    <>
                        {result.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'>

                            </UserCard>
                        ))}
                    </>
                )
                }

            </div>
        </section>
    )
}

export default Page