<template>
  <v-container>
    <v-row v-if="loading" no-gutters style="padding: 12px; justify-content: center">
      <v-progress-circular size="20" color="#41b883" indeterminate />
    </v-row>
    <table v-else class="bets-data-table">
      <thead>
        <th v-for="(header, i) in bets_headers" :key="i">{{ header }}</th>
      </thead>
      <tbody>
        <tr v-for="(bet, i) in bets" :key="i">
          <td>
            {{ generalServices.format_date(bet.match.matchDate) }}
          </td>
          <td>
            {{ `${bet.match.homeTeam.name} x ${bet.match.awayTeam.name}` }}
          </td>
          <td>
            {{ bet.type }}
          </td>
          <td>
            {{ generalServices.format_value(bet.value) }}
          </td>
          <td>
            <font-awesome-icon
              v-if="bet.won"
              :icon="['fa', 'check']"
              style="color: green"
            />
            <font-awesome-icon
              v-else
              :icon="['fa', 'xmark']"
              style="color: red"
            />
          </td>
          <td>
            {{ generalServices.format_value(bet.profit) }}
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination
      v-model="page"
      color="#41b883"
      :length="totalPages"
      style="margin-top: 16px"
      @input="change_page"
    >
    </v-pagination>
  </v-container>
</template>

<script src="./index"></script>

<style scoped>
</style>