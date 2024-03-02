/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/YElNwWwPHbD
 */


export function Loader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <div className="mb-4">
        <img
          alt="Intelli logo"
          className="h-24 w-24"
          height="100"
          src="/Logo.svg"
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width="100"
        />
      </div>
      <div className="text-xl font-semibold">Intelli</div>
      <Progress className="mt-4 w-64" value={50} />
    </div>
  )
}
