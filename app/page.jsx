import Feed from "@components/Feed";
import Nav from "@components/Nav";
import "@styles/globals.css";

const Home = () => {
  return (
    <>
      <section className="w-full flex-center flex-col">
        
        <h1 className="head_text text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">AI Powerd Prompts</span>
        </h1>
          <p className="desc text-center">
            Promptopia is an open-source AI prompting toll for a mordern world to discover , create and share creative prompts
          </p>
          <Feed/>
          {/* <Nav/> */}

      </section>
    </>
  );
};

export default Home;
