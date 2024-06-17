export default interface WeatherApiLocation {
	/** Latitude in decimal degree */
	lat: number;
	/** Longitude in decimal degree */
	lon: number;
	/** Location name */
	name: string;
	/** Region or state of the location, if available */
	region: string;
	/** Location country */
	country: string;
	/**  Time zone name*/
	tz_id: string;
	/** Local date and time in unix time */
	localtime_epoch: number;
	/** Local date and time */
	localtime: string;
}
