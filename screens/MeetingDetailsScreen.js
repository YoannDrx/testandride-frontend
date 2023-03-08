import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";

// hooks
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import { updateCourseStatutStore } from "../reducers/meetingDetails";

// modules
import { callNumber } from "../modules/callNumber";
import { statuStyle } from "../modules/statutStyle";
import { updateCourseStatut } from "../modules/updateCourseStatut";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//components
import BikeCard from "../components/meetingDetails/BikeCard";
import ClientCard from "../components/meetingDetails/ClientCard";
import EventCard from "../components/meetingDetails/EventCard";

// Style constants
import constant from "../constants/constant";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const mainColor = constant.mainColor;
const secondaryColor = constant.secondaryColor;
const borderRadius = constant.borderRadius;
const secondaryBackground = constant.secondaryBackground;
const logoPath = constant.logoPath;
const mainBackground = constant.mainBackground;
const dangerColor = constant.dangerColor;
const btnPadding = constant.btnPadding;
const warningColor = constant.warningColor;

export default function MeetingDetailsScreen({ navigation }) {
  const meetingDetails = useSelector((state) => state.meetingDetails.value);
  const dispatch = useDispatch();

  //fonction pour anviguer vers le feedback
  const handleFeedback = () => {
    navigation.navigate("feedback");
  };

  //fonctioner pour changer le statut du test en "fait"
  const handleFinishTest = async (newStatut) => {
    const updateResult = await updateCourseStatut(
      newStatut,
      meetingDetails.infos.id
    );
    if (updateResult) {
      dispatch(updateCourseStatutStore(newStatut));
    }
  };

  // configure moment to local format
  moment.locale("fr");
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome
            style={styles.iconBack}
            name="arrow-left"
            size={30}
            color={secondaryColor}
          />
          <Text style={styles.navText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navJournee}
          onPress={() => navigation.navigate("DrawerNavigator")}
        >
          <Text style={styles.navText}>Ma journée</Text>
          <FontAwesome
            style={styles.iconBack}
            name="arrow-right"
            size={30}
            color={secondaryColor}
          />
        </TouchableOpacity>
      </View>

      {/* BODYCONTAINER */}
      <View style={styles.bodyContainer}>
        {/* TOPCONTAINER */}
        <View style={styles.topContainer}>
          <View style={styles.iconBox}>
            <FontAwesome
              style={styles.icon}
              name="calendar"
              size={30}
              color={secondaryColor}
            />
            <Text style={styles.title}>
              Course n° {meetingDetails.infos.fields.Course_id}
            </Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTxt}>
              {moment(meetingDetails.infos.fields.date_essai).format("llll")}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusBox}>
              <Text
                style={[
                  styles.statusText,
                  statuStyle(meetingDetails.infos.fields.Statut),
                ]}
              >
                {meetingDetails.infos.fields.Statut}
              </Text>
            </View>
          </View>
        </View>
        {/* MIDDLE CONTAINER*/}

        <ScrollView style={styles.middleContainer}>
        <BikeCard />
          <ClientCard handleFinishTest={handleFinishTest} />
          
          <EventCard/>
        </ScrollView>
      </View>

      {/* BOTTOM BUTTON BAR */}
      <View style={styles.bottomButtonBar}>
        <TouchableOpacity
          style={[styles.btnHalfWidth, styles.btnOutlinedValidate]}
          onPress={() => handleFinishTest("Fait")}
        >
          <Text style={styles.doneText}>Test terminé</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnHalfWidth, styles.btnContainValidate]}
          onPress={() => handleFeedback()}
        >
          <Text style={styles.feedbackText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: secondaryBackground,
  },
  bodyContainer: {
    justifyContent: "space-between",
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    marginRight: 10,
  },
  /*
   *** HEADER
   */
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },

  navText: {
    fontSize: 16,
    fontWeight: "600",
    color: secondaryColor,
    paddingHorizontal: btnPadding,
  },
  header: {
    marginHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: btnPadding,
  },
  navJournee: {
    marginHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: btnPadding,
  },
  /*
   *** HEADER STATUS
   */
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: btnPadding,
    marginVertical: 10,
    borderRadius: borderRadius,
    backgroundColor: mainBackground,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusContainer: {
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 10,
    borderRadius: borderRadius,
    width: "100%",
  },
  statusBox: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    borderRadius: borderRadius,
    textAlign: "center",
    padding: 15,
    width: "100%",
  },
  iconCircle: {
    marginRight: 10,
  },
  dateTimeContainer: {
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTxt: {
    fontSize: 18,
    color: secondaryColor,
  },
  timeTxt: {
    fontSize: 20,
    fontWeight: "600",
  },
  /*
   *** MIDDLE CONTAINER ***
   */
  middleContainer: {
    height: "50%",
  },

  /*
   *** BOTTOM BUTTON BAR ***
   */
  bottomButtonBar: {
    flex: 1,
    padding: 10,
    backgroundColor: mainBackground,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
  },
  btnHalfWidth: {
    borderRadius: borderRadius,
    padding: btnPadding,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.4,
    marginHorizontal: 10,
  },
  btnContainValidate: {
    backgroundColor: mainColor,
  },
  btnOutlinedValidate: {
    borderColor: mainColor,
    borderWidth: 1,
  },
  doneText: {
    color: mainColor,
    fontWeight: "600",
  },
  feedbackText: {
    color: mainBackground,
    fontWeight: "600",
  },
});
