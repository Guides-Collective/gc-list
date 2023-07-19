<script lang="ts">
    import { onMount } from 'svelte'
    import { getProviders } from '../services/getProviders'
    import type { Provider } from '../types'
      
    let providers: Provider[] = [];
    let page = 1;
    let pageSize = 10;
    let searchFilter = "";
    let selectedOrganization = '';
  
    const updateResults = async () => {
  try {
    providers = await getProviders(page, pageSize, searchFilter, selectedOrganization);
  } catch (error) {
    console.error('There was an error getting the providers:', error);
  }
};

  
    onMount(() => updateResults());
  
    export const loadMore = async () => {
      page++;
      await updateResults();
    };
  
    const handleSearch = async () => {
  console.log('handleSearch triggered');
  page = 1;
  await updateResults();
};
    // handle selection change
    const onSelectionChange = async () => {
      page = 1;
      await updateResults();
    };
  </script>
  
  <input type="text" bind:value={searchFilter} on:input={handleSearch} placeholder="Search" />  


<!-- Add a dropdown for Organizations -->
<select bind:value={selectedOrganization} on:change={onSelectionChange}>
    <option value="">All</option>
    {#each [...new Set(providers.map(item => item.Organization))] as organization}
      <option>{organization}</option>
    {/each}
  </select>
  
  
<style>
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
    }

    @media (max-width: 1200px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 900px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .grid {
        grid-template-columns: repeat(1, 1fr);
      }
    }
   
    .card {
       border: 1px solid #ddd;
       border-radius: 4px;
       padding: 16px;
       margin: 16px;       
       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
   
   .card img {
     width: 100%;
     height: auto;
     aspect-ratio: 4 / 3;
     object-fit: cover;
   }
</style>  
  <div class="grid">
    {#each providers as provider (provider.ID)}
      <div class="card">
        <img src="path-to-image.jpg" alt="Provider Image">
        <h2>{provider.Organization ?? 'N/A'}</h2>
        <p>{provider.Program ?? 'N/A'}</p>
        <p>{provider.Tuition ?? 'N/A'}</p>
        <p>{provider['Teaching Format'] ?? 'N/A'}</p>
      </div>
    {/each}
  </div>
  
  <button on:click={loadMore}>Load More</button>
