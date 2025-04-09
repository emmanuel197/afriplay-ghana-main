const ErrorPage = ({ text }) => {
    return (
        <>
            <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff' }}>
                <h1>{text}</h1>
            </main>
        </>
    )
}

export default ErrorPage