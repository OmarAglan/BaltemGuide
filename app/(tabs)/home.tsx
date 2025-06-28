import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderText from '../../components/headerText';
import { getLocalGreeting } from '../../utils/helpers';
import { images } from '../../assets';
import SearchInput from '../../components/home/searchInput';
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';
import { themeColors } from '../../theme';
import LocItem from '../../components/home/locItem';
import {
  type2Filters,
  locFFullData,
  typeFilters,
  locFullData,
} from '../../assets/data/data';
import FuturedItem from '../../components/home/futuredItem';
import SectionHeader from '../../components/home/sectionHeader';
import AreaFilter from '../../components/home/areaFilter';
import SubjectFilter from '../../components/home/subjectFilter';
import { useUser } from '@clerk/clerk-expo';

const { avatar } = images;

export default function HomeScreen() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [loc, setLoc] = useState(locFullData);
  const [fLoc, setFLoc] = useState(locFFullData);
  const [SelectedSubject, setSelectedSubject] = useState();
  const [locFilterVisible, setLocFilterVisible] = useState(false);
  const [fLocFilterVisible, setFLocFilterVisible] =
    useState(false);

  /**
   * @description Function to toggle the Loc filter visibility
   */
  const toggleLocsFilter = () => {
    setLocFilterVisible(!locFilterVisible);
  };

  /**
   * @description Function to toggle the Futuerd Loc filter visibility
   */
  const toggleFLocFilter = () => {
    setFLocFilterVisible(!fLocFilterVisible);
  };

  /**
   * @description handles search for Loc and FLoc
   * @param {*} searchQuery
   */
  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setLocFilterVisible(false);
    setFLocFilterVisible(false);

    // set query to lowercase
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Filter teachers based on the search query
    const filteredLoc = locFullData.filter((teacher) =>
      teacher.name.toLowerCase().includes(lowerCaseQuery)
    );
    setLoc(filteredLoc);

    // Filter institutions based on the search query
    const filteredFLoc = locFFullData.filter((institution) =>
      institution.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFLoc(filteredFLoc);
  };

  /**
   * @description Function to filter Loc based on the selected Value
   * @param {*} subject
   */
  const filterLocByType = (subject: string) => {
    setSelectedSubject(subject as any);

    // Filter the teachers based on the selected subject
    if (subject.toLowerCase() === 'all subjects') {
      setLoc(locFullData); // Show all teachers when 'All Subjects' is selected
    } else if (subject.toLowerCase() === 'science for technology') {
      setLoc(locFullData);
    } else {
      const filteredTeachers = locFullData.filter(
        (teacher) => teacher.subject.toLowerCase() === subject.toLowerCase()
      );
      setLoc(filteredTeachers);
    }
  };

  return (
    <SafeAreaView className="bg-bgWhite px-7 pt-5 pb-[-35px] flex-1">
      {/**============= Header Area =================== */}
      <View className="flex flex-row items-center justify-between">
        <View className="">
          {/** Get greeting based on current time */}
          <HeaderText text={getLocalGreeting()} />
          <Text className="font-exo font-semibold text-lg">{user?.firstName || 'User'}</Text>
        </View>
        {/** ============= Profile image/avatar ============ */}
        <View className="bg-bgWhite shadow-xl rounded-xl">
          <Image 
            source={user?.imageUrl ? { uri: user.imageUrl } : avatar} 
            style={{ height: 62, width: 62, borderRadius: 12 }} 
          />
        </View>
      </View>
      {/** ================ Search Input  ========================= */}
      <View className="flex flex-row items-center justify-between my-7">
        <View className="flex-1">
          <SearchInput
            placeholder={'Search'}
            value={searchQuery}
            onChange={handleSearchChange}
            Icon={MagnifyingGlassIcon}
          />
        </View>
        {/** ==================== Filter Icon ================================= */}
        <Pressable className="ml-3">
          <AdjustmentsVerticalIcon size={28} color={themeColors.darkGrayText} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className=" h-full w-full"
      >
        {/** ========================= Teachers Section =========================== */}
        <View className="mt-2">
          <SectionHeader
            title={'Popular Locations'}
            onFilterPress={toggleLocsFilter}
            tintColor={
              locFilterVisible
                ? themeColors.bgPurple
                : themeColors.lightGrayText
            }
          />

          {/**============== Teacher Filters ==================== */}
          {locFilterVisible ? (
            <View className="flex flex-col my-5 space-y-2">
              <AreaFilter filters={type2Filters} />
              <SubjectFilter
                filters={typeFilters}
                onSubjectSelect={filterLocByType}
              />
            </View>
          ) : null}

          {/** ========================= Render List of Loc =========================== */}

          <FlatList
            data={loc}
            horizontal={true}
            className="w-full py-4 bg-transparent"
            renderItem={({ item }) => <LocItem teacher={item} />}
            keyExtractor={(item, index) => item.name + index}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/** ========================= Institutions Section =========================== */}
        <View className="mt-2">
          <SectionHeader
            title={'Popular Locations'}
            onFilterPress={toggleFLocFilter}
            tintColor={
              fLocFilterVisible
                ? themeColors.bgPurple
                : themeColors.lightGrayText
            }
          />

          {/**============== Institution Filters ==================== */}
          {fLocFilterVisible ? (
            <View className="flex flex-col mt-5 space-y-2">
              <AreaFilter filters={type2Filters} />
            </View>
          ) : null}

          {/** ========================= Render List of institutions =========================== */}
          <View
            className={`w-full bg-transparent ${
              fLocFilterVisible ? 'pt-0' : 'pt-4'
            }`}
          >
            {fLoc.map((institution, index) => (
              <FuturedItem institution={institution} key={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}