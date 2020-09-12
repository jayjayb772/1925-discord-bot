function url() {
    return (process.env.environment==='dev') ? (process.env.local_orchestrator_url)
        : ((process.env.environment==='prod') ? (process.env.prod_orchestrator_url)
            : (process.env.prod_orchestrator_url));
}

module.exports = {url}