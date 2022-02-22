/**
 * simple loading skeleton
 *
 * @author AH.SALAH
 * @export
 * @param {{ color?: string, other?: ReactPropTypes }} { color = 'border-blue-700', other }
 * @returns
 */
export default function Loading({ color = 'border-blue-700', other }) {
    return (
        <div className='grid place-content-center bg-zinc-100 rounded-3xl opacity-80 w-screen h-screen text-white'>
            <div className={`rounded-full w-10 h-10 ${color} duration-75 border-2 border-r-0 animate-spin`} {...other}></div>
        </div>
    )
}

export const LoadingIcon = ({ color = 'border-blue-700', classes='' }) => {
    return (
        <div className={`rounded-full w-10 h-10 ${color} duration-75 border-2 border-r-0 animate-spin ${classes}`}></div>
    )
};