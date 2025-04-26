import prisma from "db/client";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
}


//if some1 is running frontend using docker - they wont see hot reloading . static pages will be built at the build stage in nextjs (SSG), which will make the frontend talking to database(like the above one) not to use dynamic content. - so we have to do some changes in dockerfile.frontend
//and the below two solns - help to force the page , not to be static --- i.e it will make sure build stage doesnt need to talk to database ---- if below solns are used , no need to make changes in dockerfile.frontend. if not , we have to send some args(database url) in dockerfile

// export const revalidate = 60 // revalidate every 60 seconds --incremental site generation --page acts as both static and dynamic
// or
// export const dynamic = 'force-dynamic'  //page is both completely dynamic
