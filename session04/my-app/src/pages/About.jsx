import Navigation from "../components/Navigation";

function About({ text }) {
  return (
    <>
      <main>
        <h2>who are we?</h2>
        <p>we are JCWD!</p>
        <p>{text}</p>
      </main>
      <Navigation />
    </>
  );
}

export default About;
