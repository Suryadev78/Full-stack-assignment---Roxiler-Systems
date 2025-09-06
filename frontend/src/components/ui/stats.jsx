import useAdminStats from "../../hooks/useAdminStats.js"
export default function StatsSection() {
    const {stats,loading,error} = useAdminStats();
    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error: {error}</div>
    }
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div
                    className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">{stats.total_users}</div>
                        <p>Total Users</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">{stats.total_stores}</div>
                        <p>Total Stores</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">{stats.total_ratings}</div>
                        <p>Total Ratings</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
