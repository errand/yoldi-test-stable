import Profile from '../../components/Profile'
import {useAuth} from "../../hooks/auth";

export default function Home() {

    const { profile, user } = useAuth({ middleware: 'auth' })

    return <Profile profile={profile} user={user} isAuthor={profile?.slug === user?.slug} />
}
