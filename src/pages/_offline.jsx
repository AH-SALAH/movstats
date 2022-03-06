import CustomHead from '@/components/CustomHead';
import { Meta } from '@/components/Meta';

export default function Offline() {
    return (
        <>
            <CustomHead
                meta={
                    <Meta
                        title="Movie DB Offline"
                        description="Movie DB Analysis Offline"
                    />
                }
            />
            <h1>This is offline fallback page</h1>
            <h2>When offline, any page route will fallback to this page</h2>
        </>
    )
}