package com.realnetworks.cordova.exchange;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import android.util.Log;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Vector;
// import android.os.StrictMode;

import microsoft.exchange.webservices.data.*;

public class EWSHandler extends CordovaPlugin {
    URI uri;
    public String TAG = "EWSHandler";

    public static JSONObject _data = null;
    public static CallbackContext cbc = null;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("create")) {
            _data = data.getJSONObject(0);
            cbc = callbackContext;
            Log.i("callplanner", "data from callplanner : " + _data.toString());
            // StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().permitAll().build());
            // this.cordova.getActivity().runOnUiThread(new Runnable() {
            this.cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    try {
                        if(exchangeService()) {
                            cbc.success("Succeeded to create appointment.");
                        } else {
                            cbc.error("Failed to create appointment via exchange api.");
                        }
                    } catch(Exception e){
                        cbc.error("Failed to create appointment due to exception - " + e.getMessage());
                    }
                }
            });

            return true;
        } else {
            callbackContext.error("unknown command - " + action);
            return false;
        }
    }

    public boolean exchangeService() throws Exception {

         try {
            // StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().permitAll().build());
            String scheduledAt = _data.getString("scheduledAt");
            String title = _data.getString("title");
            String ownerEmail = "";
            String password = "";
            Vector<String> memberEmailList = new Vector<String>();
            ownerEmail = _data.getString("exchangeEmail");
            password = _data.getString("exchangePassword");
            
            JSONArray attendees = _data.getJSONArray("attendees");
            for (int i = 0; i < attendees.length(); i++) {
                JSONObject attendant = attendees.getJSONObject(i);
                // if(attendant.getString("role").equals("owner")) {
                //     ownerEmail = attendant.getString("exchangeEmail");
                //     password = attendant.getString("exchangePassword");
                // }
                 
                if(attendant.getString("role").equals("member")) {
                    try {
                        memberEmailList.add(attendant.getString("exchangeEmail"));
                    } catch(Exception e) {
                        Log.e("callplanner", "email for " + attendant.getString("role") + "-" + attendant.getString("name") + " is error.");
                    }
                } else {
                    continue;
                }

            }
            if(ownerEmail == null || ownerEmail.trim().equals("")) {
                Log.d("callplanner", "Email address of owner is not defined.");
                throw new Exception("Email address of owner is not defined.");
            }


            ExchangeService service = new ExchangeService();
            Log.d("callplanner", "owner email : " + ownerEmail.substring(0, ownerEmail.indexOf("@")));
            ExchangeCredentials credentials = new WebCredentials(ownerEmail.substring(0, ownerEmail.indexOf("@")), password);
            service.setCredentials(credentials);
            service.setTraceEnabled(true);

            try {
                uri = new URI("https://corpmail.real.com/EWS/Exchange.asmx");
            } catch (URISyntaxException e) {
                Log.i("callplanner", "Exception on uri - " + uri.toString());
                throw e;
            }

            try {
                service.setUrl(uri);
            } catch (Exception e) {
                Log.i("callplanner", "Exception on setting uri on exchange service");
                throw e;
            }

            try {
                Log.i("callplanner", "Try to create new Appointment.");
                Appointment appointment = new Appointment(service);
                appointment.setSubject("[Call Planner] Created : " + title);
                appointment.setLocation("Conference");

                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
                Date startDate = formatter.parse(scheduledAt.replace("T"," ").replace("Z",""));
                Date endDate = new Date(startDate.getTime() + 3600000l);

                appointment.setStart(startDate);//new Date(2010-1900,5-1,20,20,00));
                appointment.setEnd(endDate); //new Date(2010-1900,5-1,20,21,00));
                
                for(String attendant : memberEmailList) {
                    appointment.getRequiredAttendees().add(attendant);
                }

                //            formatter = new SimpleDateFormat("yyyy-MM-dd");
                //            Date recurrenceEndDate = formatter.parse("2010-07-20");
                //            appointment.setRecurrence(new Recurrence.DailyPattern(appointment.getStart(), 3));
                //            appointment.getRecurrence().setStartDate(appointment.getStart());
                //            appointment.getRecurrence().setEndDate(recurrenceEndDate);
                Log.i("callplanner", "Creating new Appointment to EWS...");
                appointment.save();
                return true;

            } catch (Exception e) {
                Log.i("callplanner", "Error while generating appointment - " + e);    
                throw e;
            } 
        } catch(Exception ee) {
            Log.i("callplanner", "Error while creating appointment - " + ee);
            throw ee;
        }
    }
}
