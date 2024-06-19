<template>
  <v-container class="mt-5">
    
    As of June 18, 2024. Subject to change.
          <v-card :title="title" flat>
            <template v-slot:text>
              <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
              ></v-text-field>
            </template>
        
            <v-data-table :headers="headers" :items="filteredData" :search="search" :items-per-page="0"
              hide-default-footer disable-sort>

              <template v-slot:header.performance="{ column }">
                <v-select :items="dropdown" v-model="performance" label="Performance">
                </v-select>
              </template>

              <template v-slot:item.participants="{ item }">
                <div class="text-end">
                  <v-chip class="ma-1" size="default" v-for="(performer, index) in item.participants">{{ performer }}</v-chip>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-container>
</template>

<script>
  import json from '../assets/all_performance.json'

  export default {
    methods: {

      },
      computed: {
        title() {
          return `${this.performance} Recital Performances`
        }
      },
      mounted() {
        this.jsonData = json
        this.filteredData = this.jsonData          
      },
      watch: {
        performance(val) {
          this.filteredData = val == 'All' ? this.jsonData : this.jsonData.filter((p) => p.performance == val)
        }
      },
      data: () => ({
        search: '',
        headers: [{ title: 'Performance', key: 'performance', width: '20%' }, { title: 'Number', key: 'performance_number' }, { title: 'Title', key: 'performance_name' }, { title: 'Participants', key: 'participants' }],
        jsonData: [],
        dropdown: [
          { title: 'All' },
          { title: 'Metairie AM' },
          { title: 'Metairie PM' },
          { title: 'Lakeview AM' },
          { title: 'Lakeview PM' },
        ],
        performance: 'All',
        filteredData: [],
      })
  }
</script>
