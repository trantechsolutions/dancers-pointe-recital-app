<template>
  <v-container class="mt-5">
    As of June 18, 2024. Subject to change.
          <v-card :title="title" flat>
            <template v-slot:text>
              <v-text-field
                v-model="search"
                label="Search for participants"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
              ></v-text-field>
            </template>
        
            <v-data-table :headers="headers" :items="filteredData" :items-per-page="0" :item-value="getGuid"
              hide-default-footer disable-sort show-expand>

              <template v-slot:header.performance="{ column }">
                <v-select :items="dropdown" v-model="performance" label="Performance">
                </v-select>
              </template>

              <!-- <template v-slot:item.participants="{ item }">
                <v-chip class="ma-1" size="default" v-for="(performer, index) in item.participants">{{ performer }}</v-chip>
              </template> -->

              <template v-slot:expanded-row="{ columns, item }">
                <tr>
                  <td :colspan="columns.length" class="pa-5">
                    <h3>Participants</h3>
                    <p>
                      <v-chip class="ma-1" size="default" v-if="item.participants.length <= 0">{{ item.performance_name }}</v-chip>
                      <v-chip class="ma-1" size="default" v-else v-for="(performer, index) in item.participants">{{ performer }}</v-chip>
                    </p>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-container>
</template>

<script>
  import json from '../assets/all_performance.json'

  export default {
    methods: {
        getGuid(item) {
          return `${item.performance}${item.performance_number}`
        }
      },
      computed: {
        title() {
          return `${this.performance} Recital Performances`
        },
      },
      mounted() {
        this.filteredData = json
      },
      watch: {
        performance(val) {
          const participants = this.search == '' ? json : json.filter((p) => p.participants.some((name) => name.toLowerCase().includes(this.search.toLowerCase())))
          this.filteredData = val == 'All' ? participants : participants.filter((p) => p.performance == val)
        },
        search(val) {         
          const performance = this.performance == 'All' ? json : json.filter((p) => p.performance == this.performance)
          this.filteredData = val == '' ? performance : performance.filter((p) => p.participants.some((name) => name.toLowerCase().includes(val.toLowerCase())))
        }
      },
      data: () => ({
        search: '',
        headers: [
          { title: 'Performance', key: 'performance' },
          { title: 'Number', key: 'performance_number' },
          { title: 'Title', key: 'performance_name' },
        ],
        dropdown: [
          { title: 'All' },
          { title: 'Metairie AM' },
          { title: 'Metairie PM' },
          { title: 'Lakeview AM' },
          { title: 'Lakeview PM' },
        ],
        performance: 'All',
        filteredData: json,
      })
  }
</script>
