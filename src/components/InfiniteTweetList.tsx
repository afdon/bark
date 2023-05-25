

type Tweet = {
    id: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    likedByMe: boolean;
    user: { id: string; image: string | null; name: string | null };
};

type InfiniteTweetListProps = {
    isLoading: boolean
    isError: boolean
    hasMore: boolean
    fetchNewTweets: () => Promise<unknown>
    tweets?: Tweet[];
};


export function InfiniteTweetList({ tweets, isError, isLoading, fetchNewTweets, hasMore }: InfiniteTweetListProps) {
    if (isLoading) return (<h1>Loading...</h1>)
    if (isError) return (<h1>Error</h1>)
    if (tweets == null || tweets.length === 0) return (
        <h2 className="my-4 text-center text-2xl text-gray-500">Nothing to see here...</h2>
    )


    return (<ul></ul>)
}