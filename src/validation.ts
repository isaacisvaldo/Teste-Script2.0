
  /*
  export function completeTrip(
    trip: TripModel,
    provider: ProviderModel,
    location: PositionAsDecimal
  ) {
   const phone = trip.user_phone
    return new Promise<{
      success: boolean;
      code: Codes;
      message: string;
      status: number;
      trip: TripModel;
    }>(async (resolve, reject) => {
      const tripLocation = await TripLocation.findOne({ tripID: trip._id });
  
      if (!tripLocation) {
        return reject({
          success: false,
          code: Codes.TRIP__NOT_FOUND,
          message: i18next.t(i18nKeys.TRIP_NOT_FOUND),
          status: HttpStatus.INTERNAL_SERVER_ERROR
        });
      }
  
      // Set final trip location data
      tripLocation.endTripTime = new Date();
      tripLocation.endTripLocation = [location.latitude, location.longitude];
      tripLocation.startTripToEndTripLocations.push(tripLocation.endTripLocation);
      tripLocation.actual_startTripToEndTripLocations =
        tripLocation.startTripToEndTripLocations;
  
      // Calculate fees
      const values = await BillingHelper.calculateTaxAndEarnings(
        provider._id,
        trip.estimated_fare,
        trip.total_for_company
      );
  
      // Check daily charge
      // BillingHelper.calculateProviderDailyCharge(provider, trip._id);
  
      trip.fooy_tax_fee = 0;
      trip.tax_fee = Number(values.tax.toFixed(2));
      trip.base_plan = provider.plan.type;
      trip.total = Number(values.earning.toFixed(2));
      trip.is_fooy_tax_fee_registered = true;
      trip.provider_trip_end_time = new Date();
      trip.status = TripStatus.TRIP_END;
      trip.is_trip_completed = 1;
  
      // Regra de bonificação para multiplos destinos: Para cada novo destino a ser entregue, ele multiplica a metade do valor de um trajeto pela quantidade de destinos extras
      trip.bonus = calculateBonus(
        Number(values.earning.toFixed(2)),
        trip.destinations.length
      );
  
      const city = await City.findById(trip.city_id);
  
      // let long_distance_value = 0;
  
      // if (city) {
      //   long_distance_value = await BillingHelper.calculateLongDistanceFee(
      //     trip.confirmed_provider,
      //     city,
      //     trip.total_distance
      //   );
  
      //   trip.long_distance_fee = long_distance_value;
  
      //   //Remove o valor pq ele já é embutido na estimativa
      //   // if (long_distance_value > 0) {
      //   //   trip.total -= long_distance_value;
      //   // }
      // }
  
      const newProvider = await Provider.findById(provider!._id);
      newProvider!.current_trips = await Provider.removeTripId(
        newProvider!,
        trip._id
      );
      newProvider!.is_available = 1;
      await newProvider!.save();
  
      await trip.save();
      await notifyStatusChange(trip);
  
      // Insert values in wallets\
      await Promise.all([
        insertEntryProvider(
          trip.confirmed_provider,
          city!.franchiseid,
          city!._id,
          `Pagamento da entrega ${trip.unique_id}`,
          FinancialType.INPUT,
          FinancialTag.TRIP_PAYMENT,
          FinancialReference.TRIP,
          trip._id,
          trip.created_at,
          trip.total
        )
        // insertEntryProvider(
        //   trip.confirmed_provider,
        //   city!.franchiseid,
        //   city!._id,
        //   `Bônus ${trip.unique_id}`,
        //   FinancialType.INPUT,
        //   FinancialTag.TRIP_BONUS,
        //   FinancialReference.TRIP,
        //   trip._id,
        //   trip.created_at,
        //   trip.bonus
        // )
      ]);
  
      // Verifica se o bonus é maior que 0 e se a corrida é do tipo marketplace
      if (
        trip.bonus > 0 &&
        trip.requester_type === RequesterTypeEnum.TYPE_STORE
      ) {
        insertEntryProvider(
          trip.confirmed_provider,
          city!.franchiseid,
          city!._id,
          `Bônus de múltiplos destinos ${trip.unique_id}`,
          FinancialType.INPUT,
          FinancialTag.TRIP_BONUS,
          FinancialReference.TRIP,
          trip._id,
          trip.created_at,
          trip.bonus
        );
      }
      // else if (long_distance_value > 0)
      //   await insertEntryProvider(
      //     trip.confirmed_provider,
      //     city!.franchiseid,
      //     city!._id,
      //     `Bônus de longa distância ${trip.unique_id}`,
      //     FinancialType.INPUT,
      //     FinancialTag.TRIP_BONUS,
      //     FinancialReference.TRIP,
      //     trip._id,
      //     trip.created_at,
      //     long_distance_value
      //   );
  
      return resolve({
        success: true,
        code: Codes.OK,
        message: "success",
        status: HttpStatus.OK,
        trip
      });
  
      // return reject({
      //   success: false,
      //   code: Codes.UNKNOWN_ERROR,
      //   message: i18next.t(i18nKeys.REQUEST_ERROR),
      //   status: HttpStatus.INTERNAL_SERVER_ERROR
      // });
    });
  
  }*/
 