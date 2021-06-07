<script>
    export let userLimits = {};
</script>


<div class="bg-white shadow-md overflow-hidden sm:rounded-lg my-8">
    <div class="px-4 py-5 sm:px-6">

        <div class="lg:text-center my-4">
            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Trading limits</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Your personal trading limits and usage
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                This is the latest state of your trading limits and what volume you have left for today and this month.
            </p>
        </div>

        {#each [
            ["daily", "Your limit for today"],
            ["monthly", "Your limit for this month"],
        ] as [
            key, label
        ]}
            <div class="relative pt-1 mb-8">
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div 
                    style={`width:${userLimits [key].availableEUR / userLimits [key].limitEUR * 100}%`}
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                ></div>
            </div>
            { label }: { userLimits [key].availableEUR }/{ userLimits [key].limitEUR } EUR
            </div>
        {/each}
    </div>
</div>