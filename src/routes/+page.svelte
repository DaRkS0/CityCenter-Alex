<script>
  import { goto } from "$app/navigation";
  import { NewDoc } from "$lib/firebase/database/client";

  let name = "";
  let email = "";
  let phone = "";
  const re = new RegExp("^01[0125][0-9]{8}$");
  $: validPhone = re.test(phone);
  async function SaveUser() {
    if (!validPhone) {
      alert("Invalid phone number");
      return;
    }
    const info = await NewDoc("Invitees", {
      name,
      email,
      phone,
    });
    goto("game?uid=" + info.id);
  }
</script>

<svelte:head>
  <title>City Center Alex | 2023</title>
</svelte:head>

<main class="h-full w-full flex flex-col items-center justify-center">
  <form class="w-full" on:submit={SaveUser}>
    <div class="mb-3 w-[70%] mx-auto">
      <img class="max-w-[40%] mb-3" src="img/name.webp" alt="" />
      <div class="w-full relative mx-auto">
        <img class="max-w-full" src="img/inputbg.webp" alt="" />
        <input
          bind:value={name}
          class="absolute inset-0 z-10 py-[3%] px-[7%] overflow-hidden w-full bg-transparent outline-none font-lg font-semibold font-mono"
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
          bind:value={phone}
          class="absolute inset-0 z-10 py-[3%] px-[7%] overflow-hidden w-full bg-transparent outline-none font-lg font-semibold font-mono"
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
          bind:value={email}
          class="absolute inset-0 z-10 py-[3%] px-[7%] overflow-hidden w-full bg-transparent outline-none font-lg font-semibold font-mono"
          required
          type="email"
        />
      </div>
    </div>

    <div class="mb-3 w-[70%] mx-auto text-center">
      <button class="relative">
        <img class="max-w-full" src="img/btn.webp" alt="" />
        <div class="absolute inset-0 w-full h-full flex items-center">
          <img class="m-auto max-h-[55%]" src="img/submit.webp" alt="" />
        </div>
      </button>
    </div>
  </form>
</main>
