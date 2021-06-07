<script>
    export let verificationStatus = {};
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow-md overflow-hidden sm:rounded-lg mt-8">
    <div class="px-4 py-5 sm:px-6">
        <div class="py-4 bg-white">
            <div class="max-w-7xl mx-auto">
                <div class="lg:text-center">
                    <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Know you customer</h2>
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Your verification status
                    </p>
                    <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        This is the latest state of your kyc verification status.
                    </p>
                </div>

                <div class="mt-10">
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

                    {#each [
                        ["general", "General verification", "Some description ;)"],
                        ["personal", "About your person", "Some description ;)"],
                        ["identity", "Identity verification", "Some description ;)"],
                        ["residence", "Proof of Residence", "Some description ;)"],
                        ["amla", "General questions", "Some description ;)"],
                        ["document", "Private documents", "Some description ;)"],
                    ] as [key, label, description]}
                        <div class="relative">
                        <dt>
                            <div class={"absolute flex items-center justify-center h-12 w-12 rounded-md bg-" + (verificationStatus [key] == true ? "green" : "blue") + "-500 text-white"}>
                            <!-- Heroicon name: outline/globe-alt -->
                            {#if verificationStatus [key] == true}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFF" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFF" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                            {/if}
                            </div>
                            <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{ label }</p>
                        </dt>
                        <dd class="mt-2 ml-16 text-base text-gray-500">
                            { description }
                        </dd>
                        </div>
                    {/each}

                </dl>
                </div>
            </div>
        </div>
    </div>
</div>