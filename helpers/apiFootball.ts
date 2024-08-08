import { env } from 'process';

export const GET_COUNTRIES = '&action=get_countries';

export const GET_LEAGUES = (countryId: number) =>
  `&action=get_leagues&country_id=${countryId}`;

export const GET_TEAMS = (leagueId: number) =>
  `&action=get_teams&league_id=${leagueId}`;

export const GET_PLAYERS = (playerName: string) =>
  `&action=get_players&player_name=${playerName}`;

export const API_FOOTBALL_URL = `https://apiv3.apifootball.com/?APIkey=${env.API_FOOTBALL}`;
