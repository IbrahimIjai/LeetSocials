import { getAuthSession } from "@/lib/auth";
import { UsernameValidator } from "@/lib/validators/username";
import { db } from "@/lib/db";
export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("session");
      return new Response("Unauthorized", { status: 401 });
    }
    console.log("Incominnnnnnnnnn", session?.user);

    const _username = session?.user.username;
    const user = await db.user.findUnique({
      where: {
        username: _username?.toString(),
      },
      include: {
        subscriptions: true,
        createdSubreddits: true,
        votes: true,
        sessions: true,
      },
    });
    const subreddits = await db.subreddit.findMany({
      select: {
        // Include these fields
        id: true,
        name: true,
        createdAt: false,
        updatedAt: false,
      },
    });
    const userSubscription = user?.subscriptions;
    console.log("user useruseruser", user);
    console.log("items", userSubscription);

    const filteredArray = subreddits.filter(
      (obj1) => !userSubscription?.some((obj2) => obj2.subredditId === obj1.id),
    );
    // const body = await req.json();
    // const { name } = UsernameValidator.parse(body);
    // const notsubscribed= subreddits.filter(arr=>!user?.subscriptions.includes(arr))
    // console.log(subreddits);
    // console.log(user?.subscriptions);
    console.log(filteredArray);
  } catch (error) {
    console.log(error);
  }
}
