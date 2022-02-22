import { Meta } from '@/components/Meta';
import CustomHead from '@/components/CustomHead';
// import Layout from '@/layout';
import Details from '@/layout/Details';
import { useRouter } from 'next/router';

const DetailsPage = () => {
    let router = useRouter();

    return (
        <>
            <CustomHead
                meta={
                    <Meta
                        title={router?.query?.slug}
                        description={router?.query?.slug}
                    />
                }
            />
            {/* <Layout> */}
            <Details />
            {/* </Layout> */}
        </>
    )
};

export default DetailsPage;
