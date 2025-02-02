export default function WelcomeSection({ username }) {
  return (
    <section className="container text-left text-gray-600 body-font bg-white rounded-lg shadow-md m-2 p-4 flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Welcome, {username}
        </h1>
        <p className="text-gray-600 mb-4 leading-relaxed text-base">
          This is a demo of a Bitcoin wallet manager. Here you can manage your
          Bitcoin wallets. You can add a new wallet, view your current wallets,
          and check the balance of your wallets.
        </p>
      </div>
    </section>
  );
}
