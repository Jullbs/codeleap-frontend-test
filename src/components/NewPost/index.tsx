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
            className="p-2 text-sm leading-4 border-gray-400 border-[1px] rounded-lg focus:outline-lilac-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="leading-[1.1875rem]">Content</label>
          <textarea
            rows={4}
            placeholder="Content here"
            className="p-2 text-sm leading-4 border-gray-400 border-[1px] rounded-lg focus:outline-lilac-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-lilac-300 self-end mt-2 px-8 py-2 rounded-lg font-bold text-white leading-[1.125rem] disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-lilac-400"
        >
          Create
        </button>
      </form>
    </section>
  )
}
