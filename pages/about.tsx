import Head from "next/head";
import Layout from "~/components/Layout";
import Meta from "~/components/Meta";

export default function Home() {
  return (
    <Layout>
      <Meta title="About Nicu Surdu" />

      <h1>Hello friend 👋</h1>
      <p>
        My name is Nicu Surdu. I&apos;m a software engineer by day, and a
        tinkerer by night. I enjoy writing good software for good people and
        using my free time to build and play with gadgets.
      </p>

      <p>
        From time to time I like to contribute to open source and work on some
        personal open source projects. You can find them all on my{" "}
        <a href="https://github.com/surdu">GitHub page</a>
      </p>

      <p>
        You can contact me on <a href="https://twitter.com/surdume">Twitter</a>,
        or even better, on my email: <strong>nicu</strong> at{" "}
        <strong>surdu</strong> period <strong>me</strong>
      </p>
    </Layout>
  );
}
