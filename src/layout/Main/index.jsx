const Main = ({ children }) => {
    return (
        <main className="mx-auto max-w-screen-lg py-20" style={{background: `url('/assets/images/goey.svg') no-repeat scroll center center/contain`}}>
            {children}
        </main>
    )
}

export default Main;