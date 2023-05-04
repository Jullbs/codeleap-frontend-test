export default function NewPost() {
  return (
    <section className="border-gray-400 border-[1px] rounded-lg p-6 flex flex-col gap-6">
      <h2 className="font-bold text-xl leading-[1.375rem]">
        What&apos;s on your mind?
      </h2>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="leading-[1.1875rem]">Title</label>
          <input
            type="text"
            placeholder="Hello world"
            className="default-input-pattern"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="leading-[1.1875rem]">Content</label>
          <textarea
            rows={4}
            placeholder="Content here"
            className="default-input-pattern"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-lilac-300 self-end default-button-pattern text-white enabled:hover:bg-lilac-400"
        >
          CREATE
        </button>
      </form>
    </section>
  )
}
