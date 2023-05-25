import { type NextPage } from "next";
import { NewTweetForm } from "~/components/NewTweetForm";
import { InfiniteTweetList } from "~/components/InfiniteTweetList";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";


// get rid of rest of imports?
// import { signIn, signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import Head from "next/head";
// import { api } from "~/utils/api";


const TABS = ["Recent", "Following"] as const

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = 
  useState<(typeof TABS)[number]>("Recent");
  const session = useSession();

  return (
    
    <>
    <header className="sticky top-0 z-10 border-b bg-white pt-2">
      <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      {session.status === "authenticated" && (
        <div className="flex">{TABS.map(
          tab => {
          return <button key={tab} className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${tab === selectedTab 
            ? "border-b-4 border-b-orange-500 font-bold"
          : ""
        }`}
        onClick={() => setSelectedTab(tab)}
        >
          {tab}
        </button>
        })}
        </div>
      )}
    </header>
    <NewTweetForm />
    {selectedTab === "Recent" ? <RecentTweets /> : <FollowingTweets />}
    </>

  );
};

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {}, 
    { getNextPageParam: (lastPage) => lastPage.nextCursor });

  return (<InfiniteTweetList 
  tweets={tweets.data?.pages.flatMap((page) => page.tweets)} 
  isError={tweets.isError}
  isLoading={tweets.isLoading}
  hasMore={tweets.hasNextPage}
  fetchNewTweets={tweets.fetchNextPage}
  />
  );
}

function FollowingTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true }, 
    { getNextPageParam: (lastPage) => lastPage.nextCursor });

  return (<InfiniteTweetList 
  tweets={tweets.data?.pages.flatMap((page) => page.tweets)} 
  isError={tweets.isError}
  isLoading={tweets.isLoading}
  hasMore={tweets.hasNextPage}
  fetchNewTweets={tweets.fetchNextPage}
  />
  );
}

export default Home;