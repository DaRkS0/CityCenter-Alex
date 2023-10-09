<script>
	// @ts-nocheck

	import { GetDocs } from '$lib/firebase/database/client';
	import CsvHandler from '$lib/CSVHandler.svelte';
	let data;
	async function Loading() {
		const Docs = await GetDocs('Invitees');
		data = Docs.docs.map((q) => ({
			Name: q.data().Name,
			Project: q.data().Project,
			Unit: q.data().Unit,
			Mobile: q.data().Mobile,
			Invitees: q.data().Invitees,
			Scaned: q.data().Scaned
		}));

		let tota = data.reduce((accum, item) => accum + item.Scaned, 0);
		//data = Docs.docs.map((q) => ({ ...q.data() }));
		data.push({
			Name: 'Total',
			Mobile: undefined,
			Classification: undefined,
			Region: undefined,
			Scaned: data.length
		});
		data.push({
			Name: 'Total Inside',
			Mobile: undefined,
			Classification: undefined,
			Region: undefined,
			Scaned: tota
		});
	}
</script>

<div id="wrapper" class=" h-full flex flex-col items-center justify-center px-[2%] pt-8 pb-4">
	{#await Loading()}
		<p class="text-2xl font-bold my-auto">Loading..</p>
	{:then}
		<div class="mx-auto">
			<CsvHandler {data} filename="Event Members">
				<button
					class="disabled:bg-gray-600 px-5 py-2 mt-4 font-semibold text-lg disabled:text-white bg-orange-400 rounded-md"
					>Download</button
				>
			</CsvHandler>
		</div>
	{/await}
</div>
