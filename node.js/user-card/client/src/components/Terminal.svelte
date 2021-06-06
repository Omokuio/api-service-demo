<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import axios from 'axios';

  const dispatch = createEventDispatcher ();

  export let applicationId = null;
  export let ssoToken = null;
  export let tokenId = null;
  const checkIntervalMs = 1000 * 5; // 5 seconds

  // Check in a regular interval, if the status of the token has changed
  onMount(async () => {
    const checkInterval = setInterval (async () => {
      const { data } = await axios.get('http://localhost:1000/api/v1/sso-tokens', {
        headers: {
          "X-USER-TOKEN": tokenId,
        },
      });
      if (data.status !== "PENDING") {
        dispatch ("updated", {
          ssoToken: data,
        });
        clearInterval (checkInterval);
      }
    }, checkIntervalMs);
  });
</script>



<div class="bg-white shadow-md overflow-hidden sm:rounded-lg mt-8">
    <div class="px-4 py-5 sm:px-6">

        <div class="lg:text-center my-4">
            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Application authorization</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Give us secure access to your account
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Please follow the steps below to give us temporary and secure access to some of your account details.
            </p>
        </div>

        {#if applicationId && ssoToken}
          <iframe 
            src={`https://buy.omoku.io/?application=${encodeURIComponent (applicationId)}&token=${encodeURIComponent (ssoToken)}`}
            title="Authorize our app"
            class="shadow-md"
          ></iframe>
        {/if}
    </div>
</div>


<style>
  iframe {
    width: 100%;
    height: 80vh;
    max-height: calc(100vh - 20rem);
  }
</style>