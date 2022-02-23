import Pagination from '@etchteam/next-pagination';
import '@etchteam/next-pagination/dist/index.css';

const PaginationC = ({total_pages=1000, size=20, theme=null}) => {
  return (
    <Pagination total={total_pages} size={size} theme={theme} />
  )
}

export default PaginationC;