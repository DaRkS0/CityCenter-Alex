<svelte:head>
  <title>City Center Alex | 2023</title>
</svelte:head>

<main class="h-full w-full flex flex-col items-center justify-center">
  <form action="" class="w-full">
    <div class="mb-3 w-[70%] mx-auto">
      <img class="max-w-[40%] mb-3" src="img/name.webp" alt="" />
      <div class="w-full relative mx-auto">
        <img class="max-w-full" src="img/inputbg.webp" alt="" />
        <input
          class="absolute inset-0 z-10 py-[3%] px-[7%] overflow-hidden w-full bg-transparent outline-none"
          required
          type="text"
        />
      </div>
    </div>

    <div class="mb-3 w-[70%] mx-auto">
      <img class="max-w-[60%] mb-3" src="img/mobile.webp" alt="" />
      <div class="w-full relative mx-auto">
        <img class="max-w-full" src="img/inputbg.webp" alt="" />
        <input
          class="absolute inset-0 z-10 py-[3%] px-[7%] overflow-hidden w-full bg-transparent outline-none"
          inputmode="tel"
          required
          type="text"
        />
      </div>
    </div>

    <div class="mb-3 w-[70%] mx-auto">
      <img class="max-w-[60%] mb-3" src="img/email.webp" alt="" />
      <div class="w-full relative mx-auto">
        <img class="max-w-full" src="img/inputbg.webp" alt="" />
        <input
          class="absolute inset-0 z-10 py-[3%] px-[7%] overflow-hidden w-full bg-transparent outline-none"
          required
          type="email"
        />
      </div>
    </div>

    <div class="mb-3 w-[70%] mx-auto text-center">
      <button class="relative">
        <img class="max-w-full" src="img/button.webp" alt="" />
        <div class="absolute inset-0 w-full h-full flex items-center">
          <img class="m-auto max-h-[70%]" src="img/submit.webp" alt="" />
        </div>
      </button>
    </div>
  </form>
</main>
