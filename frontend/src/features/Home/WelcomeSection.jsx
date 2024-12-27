export default function WelcomeSection({ username }) {
  return (
    <section className="text-gray-600 body-font bg-white rounded-lg shadow-md m-2 flex justify-center items-center">
      <div className="container mx-auto my-auto text-left">
        <div className="flex flex-col w-full p-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Welkom, {username}
          </h1>
          <p className="leading-relaxed text-base">
            Dit is een demo van een Bitcoin Wallet. Hier kunt u uw Bitcoin
            Wallets beheren. U kunt een nieuwe wallet toevoegen, uw huidige
            wallets bekijken en de balans van uw wallets bekijken.
          </p>
        </div>
      </div>
    </section>
  );
}
