<script>
    export let userDetails = {};
</script>
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow-md overflow-hidden sm:rounded-lg mt-8">
  <div class="lg:text-center my-4 mx-6">
      <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Account information</h2>
      <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Personal details and status
      </p>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          All avaliable information about your personal account on <a href="https://omoku.io" target="_blank">omoku.io</a>.
      </p>
  </div>
  <div class="border-t border-gray-200">
    <dl>
      {#each [
        ["userId", "Your id"], 
        ["mail", "Your mail"], 
        ["isVerified", "Is your mail verified?"], 
        ["isIndividual", "Is this a personal account?"], 
        ["hasTradingPermission", "Do you have trading permissions?"], 
        ["isBlocked", "Is this account blocked?"]
      ] as [
        key, label
      ] }
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
            { label }
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            { typeof userDetails [key] === "boolean" ? (userDetails [key] ? "Yes" : "No") : userDetails [key] }
            </dd>
        </div>
      {/each}
    </dl>
  </div>
</div>