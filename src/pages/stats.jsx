import { Meta } from '@/components/Meta';
import CustomHead from '@/components/CustomHead';
import Stats from '@/layout/Stats';
// import Layout from '@/layout';

const StatsPage = () => (
    <>
        <CustomHead
            meta={
                <Meta
                    title="Movies stats"
                    description="Movies Statistics"
                />
            }
        />
        {/* <Layout> */}
            <Stats/>
        {/* </Layout> */}
    </>
);

export default StatsPage;
