export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow p-4 animate-pulse">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200"/>
            <div className="mt-2 h-4 w-24 mx-auto bg-gray-200 rounded"/>
        </div>
    );
}