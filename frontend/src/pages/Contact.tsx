const Contact = () => {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-4xl rounded-4xl border border-gray-100 bg-white p-10 shadow-sm">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Contact Us
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-gray-900">
            We&apos;re here to help
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Have a question, feedback, or need assistance? Send us a message and
            we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us how we can help"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                />
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-tomato/90"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="rounded-4xl bg-primary/5 p-8 text-sm text-gray-700">
            <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Office
              </p>
              <p className="mt-4 text-lg font-semibold text-gray-900">
                Food Delivery HQ
              </p>
              <p className="mt-2 text-sm text-gray-500">123 Meal Street</p>
              <p className="text-sm text-gray-500">Cityville, CT 12345</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  Email
                </p>
                <p className="mt-3 text-sm text-gray-900">
                  support@fooddelivery.com
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  Phone
                </p>
                <p className="mt-3 text-sm text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
