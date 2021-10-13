package nl.infomedics.pps.mock;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.zip.GZIPInputStream;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.SneakyThrows;

public class Mocker {
    private static final String MOCK_LOCATION = "src/main/resources/mock/";
    public static final long SEC_MS = 1000L;
    public static final long MIN_MS = 60000L;
    public static final long HOUR_MS = 3600000L;
    public static final long DAY_MS = 86400000L;
    public static final long WEEK_MS = 604800000L;
    public static final long MONTH_MS = 2592000000L;
    public static final long YEAR_MS = 31536000000L;
    public static final long MOD11_FACTOR = 9876543298765432L;

    static ObjectMapper mapper = new ObjectMapper();
    static final long[] powersOfTen = { 1L, 10L, 100L, 1000L, 10000L, 100000L, 1000000L, 10000000L, 100000000L, 1000000000L, 10000000000L, 100000000000L,
            1000000000000L, 10000000000000L, 100000000000000L, 1000000000000000L, 10000000000000000L, 100000000000000000L, 1000000000000000000L };
    private static final String[] LIPSUM = {
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur at neque quis diam consequat fringilla. Etiam tincidunt. In lobortis magna sed ipsum. In vulputate neque id enim. Aliquam rhoncus diam. Vivamus enim. Fusce pulvinar. Etiam eu lacus. Etiam dui metus, sollicitudin at, mollis sit amet, ullamcorper et, libero. Suspendisse mauris massa, consectetuer nec, lacinia at, tempus vitae, mauris. Donec turpis nisl, imperdiet sed, vehicula eu, blandit sed, turpis. Mauris et leo at mauris commodo bibendum. Curabitur lobortis, purus id eleifend fringilla, nulla dui auctor pede, in euismod libero diam sed libero. Pellentesque sodales arcu nec odio.",
            "Praesent purus massa, fermentum eu, auctor gravida, vulputate et, est. Nam mauris lectus, laoreet et, vulputate vel, varius quis, nisl. Integer a metus. Etiam placerat consectetuer enim. Mauris metus diam, condimentum nec, bibendum nec, pellentesque ut, dui. Sed mauris mi, molestie eu, condimentum a, interdum ac, metus. Sed libero orci, aliquet nec, sollicitudin sit amet, adipiscing et, augue. Suspendisse augue metus, blandit sit amet, dignissim sit amet, fringilla sit amet, dolor. Donec elit felis, lobortis vitae, semper eu, rutrum a, ligula. Quisque at ligula id dolor molestie hendrerit. Curabitur id odio et lacus mollis fringilla. Etiam tellus orci, sollicitudin quis, malesuada ut, ultricies in, mi. Praesent eget enim. Aliquam justo. In ante. Duis faucibus arcu sit amet massa. Donec sit amet metus consequat felis porta placerat. Sed ut nibh ac est fringilla consequat. Suspendisse potenti. Proin viverra, urna id tempus hendrerit, mi lectus vestibulum neque, et tempus justo eros eu nunc.",
            "Curabitur blandit ornare nunc. Aliquam porttitor nisi eget tortor. Sed imperdiet mattis metus. Pellentesque ut ipsum vitae risus lacinia vestibulum. Aliquam erat volutpat. In id nisl a massa posuere interdum. Aliquam erat volutpat. Fusce orci. Curabitur sit amet nulla id massa lacinia congue. Fusce urna tellus, porta id, pulvinar in, suscipit vel, felis. Donec lorem pede, iaculis ut, luctus commodo, pellentesque non, lectus. Nunc nibh. Morbi eros. Nunc ut nunc. Sed in nunc. Donec blandit mauris at diam.",
            "Donec commodo orci nec nunc. Nam volutpat tellus vel lacus. Aenean nec mi. Vivamus tincidunt, justo a mollis pharetra, arcu tellus dapibus tortor, nec pharetra justo quam dictum lectus. Aliquam egestas, justo sed luctus aliquet, elit augue vulputate risus, ut pretium est dolor sed neque. Ut in urna ut diam cursus tincidunt. Duis luctus. Integer nec lorem consectetuer pede scelerisque suscipit. Vivamus ullamcorper iaculis lectus. Nulla hendrerit. Vivamus facilisis venenatis augue. Vestibulum vel est. Proin eu ipsum nec urna mattis vulputate. Fusce porttitor, lacus in dictum volutpat, massa erat facilisis elit, ac tristique leo erat vitae diam. Nunc consectetuer orci eget purus. Nunc quis massa.",
            "Cras auctor. Proin vel massa in lectus fermentum aliquam. Cras iaculis. Integer dolor. Suspendisse volutpat aliquam lectus. Curabitur ultricies, lectus et tristique fringilla, orci turpis laoreet neque, ac dignissim lorem massa at sapien. Donec felis nunc, tincidunt vel, varius sed, vestibulum in, diam. Fusce cursus. Etiam mauris dui, vulputate sed, vestibulum sit amet, eleifend nec, nulla. Donec mauris enim, mollis et, porttitor at, tincidunt et, tellus. Vestibulum nec nunc. Nulla in mi non sapien sodales ultricies. Duis ante ante, euismod ac, posuere malesuada, elementum ac, purus. Sed fermentum, pede sed elementum blandit, justo velit feugiat massa, vel facilisis tellus urna quis lorem. Aliquam elit nibh, mattis sagittis, elementum ac, tincidunt in, eros. Proin turpis." };

    static final String[] DUTCH_PHONE_PREFIXES_31 = { "0", "31", "0031" };
    static final String[] DUTCH_PHONE_PREFIXES_32 = { "0", "32", "0032" };
    static final String[] DUTCH_PHONE_PREFIXES_49 = { "0", "49", "0049" };

    static final Character[] TOKEN_CHARSET = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
            'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
            'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
    public static final char WHITESPACE = ' ';

    private static final Object[] DOMAINS = { "com", "net", "org", "gov" };
    private static List<String> genericWords = new ArrayList<>();
    private static List<String> maleFirstNames = new ArrayList<>();
    private static List<String> femaleFirstNames = new ArrayList<>();
    private static List<String> lastNames = new ArrayList<>();
    private static List<String> companies = new ArrayList<>();
    private static Map<String, Country> countries = new HashMap<>();
    private static Map<String, Language> languages = new HashMap<>();
    private static List<String> cities = new ArrayList<>();
    private static List<String> fruits = new ArrayList<>();
    private static List<String> vegetables = new ArrayList<>();
    private static List<String> foods = new ArrayList<>();
    private static List<String> products = new ArrayList<>();
    private static List<String> panagrams = new ArrayList<>();

    static {
//        loadAllLists();
    }

    /** Hide the implicit Public constructor. */
    private Mocker() {
    }

    /** Get a list of city names. */
    public static List<String> getCities() {
        return cities;
    }

    /** Get a list of company names. */
    public static List<String> getCompanies() {
        return companies;
    }

    /** Get a map of country names. */
    public static Map<String, Country> getCountries() {
        return countries;
    }

    /** Returns a Map of predefined languages of the world. */
    public static Map<String, Language> getLanguages() {
        return languages;
    }

    /** Get a list of female first names. */
    public static List<String> getFemaleFirstNames() {
        return femaleFirstNames;
    }

    /** Get a list of male first names. */
    public static List<String> getMaleFirstNames() {
        return maleFirstNames;
    }

    /** Get a list of fruit names. */
    public static List<String> getFruits() {
        return fruits;
    }

    /** Get a list of vegetable names. */
    public static List<String> getVegetables() {
        return vegetables;
    }

    /** Get a list of food names. */
    public static List<String> getFoods() {
        return foods;
    }

    /** Get a list of product names. */
    public static List<String> getProducts() {
        return products;
    }

    /** Get a list of panagrams. */
    public static List<String> getPanagrams() {
        return panagrams;
    }

    /** Returns a Character within a given range: charFrom .. charTo */
    public static char getChar(char charFrom, char charTo) {
        return (char) getInt(charFrom, charTo);
    }

    /** Returns a Character within a the range: A .. z */
    public static char getChar() {
        return getChar('A', 'z');
    }

    /** Returns a Character Array of a given size. */
    public static char[] getChars(int size) {
        char[] c = new char[size];
        for (int i = 0; i < c.length; i++) {
            c[i] = getChar();
        }
        return c;
    }

    /*** Returns a byte in the range: fromByte ... toByte ***/
    public static byte getByte(byte fromByte, byte toByte) {
        return (byte) (fromByte + new Random().nextInt(toByte - fromByte + 1));
    }

    /*** Returns a byte in the range: -128 ... 127 ***/
    public static byte getByte() {
        return getByte((byte) -128, (byte) 127);
    }

    /** Returns a byte Array of a given size. */
    public static byte[] getBytes(int size) {
        byte[] ba = new byte[size];
        for (int i = 0; i < ba.length; i++) {
            ba[i] = getByte();
        }
        return ba;
    }

    /*** Returns a byte in the range: fromShort ... toShort ***/
    public static short getShort(int fromShort, int toShort) {
        return (short) (fromShort + new Random().nextInt(toShort - fromShort + 1));
    }

    /*** Returns a short in the range: -10000 ... 10000 ***/
    public static short getShort() {
        return getShort(-10000, 10000);
    }

    /*** Returns an int in the range: [fromInt ... toInt] ***/
    public static int getInt(int fromInt, int toInt) {
        return fromInt + (new Random().nextInt(toInt - fromInt + 1));
    }

    /*** Returns an int in the range: -1073741823 ... 1073741823 ***/
    public static int getInt() {
        return getInt(-1073741823, 1073741823);
    }

    /*** Returns a long in the range: fromLong ... toLong ***/
    public static long getLong(long fromLong, long toLong) {
        return fromLong + (long) (Math.random() * (toLong - fromLong));
    }

    /*** Returns a long in the range: -10000 ... 10000L ***/
    public static long getLong() {
        return getLong(-10000L, 10000L);
    }

    /*** Returns a float in the range: fromFloat ... toFloat ***/
    public static float getFloat(float fromFloat, float toFloat) {
        return (float) getDouble(fromFloat, toFloat);
    }

    /*** Returns a float in the range: -10000 ... 10000 ***/
    public static float getFloat() {
        return (float) getDouble(-10000.0D, 10000.0D);
    }

    /*** Returns a double in the range: fromDouble ... toDouble ***/
    public static double getDouble(double fromDouble, double toDouble) {
        return fromDouble + (toDouble - fromDouble) * Math.random() / 0.9999999999999999D;
    }

    /*** Returns a double in the range: -10000 ... 10000 ***/
    public static double getDouble() {
        return getDouble(-10000.0D, 10000.0D);
    }

    /** Returns a boolean with a probability of 50% of true. */
    public static boolean getBoolean() {
        return Math.random() > 0.5D;
    }

    /** Returns a boolean with a probability of trueProbability of true. */
    public static boolean getBoolean(double trueProbability) {
        return Math.random() < trueProbability;
    }

    /*** Returns a Date in the range: fromDate ... toDate ***/
    public static Date getDate(Date fromDate, Date toDate) {
        return new Date(getLong(fromDate.getTime(), toDate.getTime()));
    }

    /*** Returns a Date in the future. Range: fminFutureMs ... maxFutureMs [Ms: milliseconds]. ***/
    public static Date getDateInFuture(long minFutureMs, long maxFutureMs) {
        long nowMs = System.currentTimeMillis();
        return new Date(getLong(nowMs + minFutureMs, nowMs + maxFutureMs));
    }

    /*** Returns a Date in the future of next 100 years. ***/
    public static Date getDateInFuture() {
        long nowMs = System.currentTimeMillis();
        return new Date(getLong(nowMs, nowMs + 31536000000L));
    }

    /*** Returns a past calendaristical Date. Range: minPastMs ... maxPastMs [Ms: milliseconds] ***/
    public static Date getDateInPast(long minPastMs, long maxPastMs) {
        long nowMs = new Date().getTime();
        return new Date(getLong(nowMs - maxPastMs, nowMs - minPastMs));
    }

    /*** Returns a calendaristical Date in the past 100 years. ***/
    public static Date getDateInPast() {
        long nowMs = System.currentTimeMillis();
        return new Date(getLong(nowMs - 31536000000L, nowMs - 1L));
    }

    /*** Returns a calendaristical Date in the interval [-100 years ... 100 years] ***/
    public static Date getDate() {
        long nowMs = System.currentTimeMillis();
        return new Date(getLong(nowMs - 3153600000000L, nowMs + 3153600000000L));
    }

    /*** Formats a calendaristical Date as a string of: yyyy MM dd with the given separator. */
    public static String getDateAsString(final Date date, final String separator) {
        return new SimpleDateFormat("yyyy" + separator + "MM" + separator + "dd").format(date);
    }

    /*** Formats a calendaristical DateTime as a string of: yyyy MM dd HH:mm with the given separator. */
    public static String getDateTimeAsString(Date date, String separator) {
        return new SimpleDateFormat("yyyy" + separator + "MM" + separator + "dd HH:mm").format(date);
    }

    /*** Formats a calendaristical Date as a string of: yyyy MM dd with the . (dot) separator. */
    public static String getDateAsString(Date date) {
        return getDateAsString(date, ".");
    }

    /*** Returns a String formatted calendaristical Date with the - (dash) separator in the interval [-100 years ... 100 years] ***/
    public static String getDateAsString() {
        return getDateAsString(getDate(), "-");
    }

    /** Returns a random item from a given list. */
    public static String getRandomListItem(List<?> aList) {
        return (String) aList.get(getInt(0, aList.size() - 1));
    }

    /** Returns a Phrase of nrWords words. */
    public static String getPhrase(int nrWords) {
        StringBuilder sb = new StringBuilder(nrWords * 10);

        for (int i = 0; i < nrWords; i++) {
            sb.append(getRandomListItem(genericWords));
            if (i < nrWords - 1) {
                sb.append(" ");
            }
        }
        return sb.toString();
    }

    /** Returns a string of the specified length. */
    public static String getString(int len) {
        StringBuilder sb = new StringBuilder(len);

        while (sb.length() < len) {
            sb.append(getRandomListItem(genericWords));
            if (getBoolean()) {
                sb.append(WHITESPACE);
            }
        }
        return sb.substring(0, len);
    }

    /** Returns an array of strings, with elements between minLen ... maxLen. */
    public static String[] getStrings(int size, int minLen, int maxLen) {
        String[] result = new String[size];
        for (int i = 0; i < result.length; i++) {
            result[i] = getVarString(minLen, maxLen);
        }
        return result;
    }

    /** Returns a variable length string between minLen ... maxLen. */
    public static String getVarString(int minLen, int maxLen) {
        return getString(getInt(minLen, maxLen));
    }

    /** Returns a Human firts name. If isMale = true ==> will generate a Male name. */
    public static String getFirstName(boolean isMale) {
        return getRandomListItem(isMale ? maleFirstNames : femaleFirstNames);
    }

    /** Returns a random Male/female firstname. */
    public static String getFirstName() {
        return getFirstName(getBoolean());
    }

    /** Returns a random lastname. */
    public static String getLastName() {
        return getRandomListItem(lastNames);
    }

    /** Returns a Human full name. If isMale = true ==> will generate a Male name. */
    public static String getFullName(boolean isMale) {
        return getRandomListItem(isMale ? maleFirstNames : femaleFirstNames) + " " + getRandomListItem(lastNames);
    }

    /** Returns a random male/female full name. */
    public static String getFullName() {
        return getRandomListItem(getBoolean() ? maleFirstNames : femaleFirstNames) + " " + getRandomListItem(lastNames);
    }

    /** Returns a random Company Name. */
    public static String getCompany() {
        return getRandomListItem(companies);
    }

    /** Returns a random Country Object. */
    public static Country getCountry() {
        String aKey = choose(countries.keySet().toArray()).toString();
        return (Country) countries.get(aKey);
    }

    /** Returns the Country with the given 2-letter code. Eg: getContry("NL") ==> Netherlands. */
    public static Country getCountry(String digraph) {
        return (Country) countries.get(digraph.trim().toUpperCase());
    }

    /** Returns a random Country name. */
    public static String getCountryName() {
        String aKey = choose(countries.keySet().toArray()).toString();
        return ((Country) countries.get(aKey)).getName();
    }

    /** Returns a random Country code. */
    public static String getCountryCode() {
        String aKey = choose(countries.keySet().toArray()).toString();
        return ((Country) countries.get(aKey)).getCode();
    }

    /** Returns a random City name. */
    public static String getCity() {
        return getRandomListItem(cities);
    }

    /** Returns a random Fruit name. */
    public static String getFruit() {
        return getRandomListItem(fruits);
    }

    /** Returns a random Vegetable name. */
    public static String getVegetable() {
        return getRandomListItem(vegetables);
    }

    /** Returns a random Food name. */
    public static String getFood() {
        return getRandomListItem(foods);
    }

    /** Returns a random Product name. */
    public static String getProduct() {
        return getRandomListItem(products);
    }

    /** Returns a random Panagram (english). */
    public static String getPanagram() {
        return getRandomListItem(panagrams);
    }

    /** Returns a random PhoneNumber. */
    public static String getPhoneNumber() {
        StringBuilder sb = new StringBuilder(12);

        for (int i = 0; i < 12; i++) {
            if ((i == 3) || (i == 7))
                sb.append("-");
            else {
                sb.append(getInt(0, 9));
            }
        }
        return sb.toString();
    }

    public static String getPhoneNumberNlDeBe() {
        int rnd = getInt(0, 99);
        if (rnd < 33) {
            return getPhoneNumberDutch();
        }
        if (rnd >= 66) {
            return getPhoneGerman();
        } else {
            return getPhoneBelgian();
        }

    }

    /**
     * Regex: ^(?:0|31|0031)\\d{9}$
     */
    public static String getPhoneNumberDutch() {
        StringBuilder sb = new StringBuilder(13);
        sb.append((String) Mocker.choose(DUTCH_PHONE_PREFIXES_31));
        sb.append("6");
        for (int i = 1; i <= 8; i++) {
            sb.append(Mocker.getInt(0, 9));
        }
        return sb.toString();
    }

    /**
     * Regex: ^(?:0|32|0032)4[789]\\d{7}$)$
     */
    private static String getPhoneBelgian() {
        StringBuilder sb = new StringBuilder(13);
        sb.append((String) Mocker.choose(DUTCH_PHONE_PREFIXES_32));
        sb.append("4");
        sb.append(Mocker.getInt(7, 9));
        for (int i = 1; i <= 7; i++) {
            sb.append(Mocker.getInt(0, 9));
        }
        return sb.toString();
    }

    /**
     * Regex: ^(?:0|49|0049)1[567]\\d{8,9}$
     */
    private static String getPhoneGerman() {
        StringBuilder sb = new StringBuilder(13);
        sb.append((String) Mocker.choose(DUTCH_PHONE_PREFIXES_49));
        sb.append("1");
        sb.append(Mocker.getInt(5, 7));
        for (int i = 1; i <= 8; i++) {
            sb.append(Mocker.getInt(0, 9));
        }
        // append the nine-th digit some times
        if (Mocker.getBoolean()) {
            sb.append(Mocker.getInt(0, 9));
        }
        return sb.toString();
    }

    /** Returns a random ZipCode. */
    public static String getZipCode() {
        StringBuilder sb = new StringBuilder(5);

        for (int i = 0; i < 5; i++) {
            sb.append(getInt(0, 9));
        }
        return sb.toString();
    }

    /** Returns a random ZipCode. */
    public static String getZipCodeNL() {
        return new StringBuilder(7).append(getInt(1000, 9999)).append(' ').append(getString(2).toUpperCase()).toString();
    }

    /** Chooses a random item from an array of objects. */
    public static Object choose(Object[] elements) {
        int low = 0;
        int hi = elements.length - 1;
        int idx = getInt(low, hi);
        return elements[idx];
    }

    /** Returns the official 3-letter (!!!) language code of a language. Eg: English = ENG */
    public static String getLanguageCode2() {
        return ((Language) languages.get(getLanguageKey())).getCode2().toUpperCase();
    }

    /** Returns a 2-letter (!!!) language code of a language. It does not always exist! */
    public static String getLanguageCode3() {
        return getLanguageKey().toUpperCase();
    }

    /** Returns the name of a random language. Eg: English */
    public static String getLanguageName() {
        return ((Language) languages.get(getLanguageKey())).getName();
    }

    /**
     * Returns a Language object based on the official 3-letter code of it. Eg: getLanguage("ENG") ==> Object for English
     */
    public static Language getLanguage(String code3) {
        return (Language) languages.get(code3.toLowerCase());
    }

    public static String getEmail() {
        return getRandomListItem(genericWords) + "@" + getRandomListItem(genericWords) + "." + getCountry().getCode().toLowerCase();
    }

    public static @NonNull String getEmailUnique(int i) {
        return getRandomListItem(genericWords) + i + "@" + getRandomListItem(genericWords) + "." + getCountry().getCode().toLowerCase();
    }

    /** Returns a random URL string. */
    public static String getURL() {
        String protocol = choose(new String[] { "http", "https", "ftp" }).toString();
        String www = getBoolean(0.75D) ? "www." : "";
        String server = getRandomListItem(genericWords).toLowerCase();
        String domain = "." + choose(DOMAINS).toString().toLowerCase();
        String app = "/" + getPhrase(getInt(1, 3)).trim().replaceAll("\\s+", "/");
        return protocol + "://" + www + server + domain + app;
    }

    /** Returns a random piece of lorem ipsum... text */
    public static String getLipsum() {
        return getLipsum(1, "\n");
    }

    /** Returns a random piece of lorem ipsum... text having the given number of paragraphs. */
    public static String getLipsum(int paragraphs) {
        return getLipsum(paragraphs, "\n");
    }

    /** Returns a random piece of lorem ipsum... text having the given number of paragraphs and line separator. */
    public static String getLipsum(int paragraphs, String lineSeparator) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < paragraphs; i++) {
            result.append(LIPSUM[(i % LIPSUM.length)]);
            if (i < paragraphs - 1) {
                result.append(lineSeparator);
            }
        }
        return result.toString();
    }

    /** Returns an 11-Proof factor. */
    public static long getMod11Factor() {
        return Mocker.MOD11_FACTOR;
    }

    /** Returns the number of digits in an long number */
    public static int getNrOfDigits(long nr) {
        return (int) Math.floor(Math.log10(Math.abs(nr != 0L ? nr : 1L))) + 1;
    }

    /** Returns an 11-proof bank account number between min and max val. */
    public static long getBankAccountNumber(long minVal, long maxVal) {
        if ((minVal < 10L) || (maxVal * 10.0d > 9223372036854775807.0d)) {
            throw new IllegalArgumentException("minVal or maxVal is out of range.");
        }
        int mod11 = 1;
        long result;
        long acc = 0L;
        long mod11Factor = getMod11Factor();

        while (mod11 == 1) {
            acc = getLong(minVal / 10L, maxVal / 10L);
            int nrOfDigits = getNrOfDigits(acc);
            int sum = 0;
            for (int i = 1; i <= nrOfDigits; i++) {
                sum = (int) (sum + getDigit(acc, i) * getDigit(mod11Factor, i));
            }
            mod11 = sum % 11;
        }
        int checkDigit = (11 - mod11) % 11;
        result = 10L * acc + checkDigit;
        return result;
    }

    /** Returns a sel-check account. */
    public static long getSelfCheckAccount() {
        return getBankAccountNumber(15L, 30L);
    }

    /** Returns quoted version of string if it contains double quote (useful for CSV entries). */
    public static String escapeCSV(final String str) {
        return str.indexOf(',') == -1 ? str : new StringBuilder(str.length() + 2).append('"').append(str).append('"').toString();
    }

    @SneakyThrows(IOException.class)
    public static void loadAllLists() {
        byte[] ezMockZipped = Files.readAllBytes(Paths.get(MOCK_LOCATION + "mocker.json.gz"));
        String ezMockStr = unzipMock(ezMockZipped);
//        String ezMockStr = Files.readString(Paths.get(MOCK_LOCATION + "mocker.json"));
//        final byte[] zippedBytes = zipMock(ezMockStr.getBytes());
//        Files.write(Paths.get(MOCK_LOCATION + "mocker.json.zip"), zippedBytes, StandardOpenOption.CREATE_NEW);
        System.out.println("ezMockStr= " + ezMockStr.substring(0, 100) + " ... " + ezMockStr.substring(ezMockStr.length()-101) + "\nTrying to convert it to POJO ...");
        EZMock ezMock = mapper.readValue(ezMockStr, EZMock.class);
        System.out.println("Successfully converted strMock to POJO. Cities: " + ezMock.getCities().size());
        cities = ezMock.getCities();
        companies = ezMock.getCompanies();
        countries = ezMock.getCountries().stream().collect(Collectors.toMap(Country::getCode, Function.identity()));
        femaleFirstNames = ezMock.getFirstNamesFemale();
        maleFirstNames = ezMock.getFirstNamesMale();
        foods = ezMock.getFoods();
        fruits = ezMock.getFruits();
        genericWords = ezMock.getGeneric();
        languages = ezMock.getLanguages().stream().collect(Collectors.toMap(Language::getCode3, Function.identity()));
        lastNames = ezMock.getLastNames();
        products = ezMock.getProducts();
        panagrams = ezMock.getPanagrams();
        vegetables = ezMock.getVegetables();
    }
/*
    private static byte[] zipMock(final byte[] ezMock) {
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            GZIPOutputStream out = new GZIPOutputStream(bos) {
                {
                    def.setLevel(Deflater.BEST_COMPRESSION);
                }
            };
            out.write(ezMock);
            out.close();
            return bos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

*/
    private static String unzipMock(final byte[] ezMockZipped) {
        byte[] buffer = new byte[4096];

        try (ByteArrayInputStream bin = new ByteArrayInputStream(ezMockZipped);
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                GZIPInputStream gzipper = new GZIPInputStream(bin)) {
            int len;
            while ((len = gzipper.read(buffer)) > 0) {
                out.write(buffer, 0, len);
            }

            gzipper.close();
            out.close();
            final String strResult = new String(out.toByteArray());
            System.out.println("Unzipped Mock=" + strResult.length() + " bytes");
            return strResult;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static String getLanguageKey() {
        Object[] a = languages.keySet().toArray();
        return a[getInt(0, a.length - 1)].toString();
    }

    private static long getDigit(long number, int digit) {
        return number / powersOfTen[(digit - 1)] % 10L;
    }

    public static String getAccessToken() {
        StringBuilder sb = new StringBuilder(32);
        for (int i = 0; i < 32; i++) {
            sb.append(Mocker.choose(TOKEN_CHARSET));
        }

        return sb.toString();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Country {
        private String code;
        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Language {
        private String code3;
        private String code2;
        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    private static class EZMock {
        private List<String> cities = new ArrayList<>(600);
        private List<String> companies = new ArrayList<>(1000);
        private List<Country> countries = new ArrayList<>(1000);
        private List<String> firstNamesFemale = new ArrayList<>(5000);
        private List<String> firstNamesMale = new ArrayList<>(1500);
        private List<String> foods = new ArrayList<>(100);
        private List<String> fruits = new ArrayList<>(50);
        private List<String> generic = new ArrayList<>(1000);
        private List<Language> languages = new ArrayList<>(260);
        private List<String> lastNames = new ArrayList<>(5000);
        private List<String> medPlants = new ArrayList<>(100);
        private List<String> panagrams = new ArrayList<>(150);
        private List<String> products = new ArrayList<>(150);
        private List<String> vegetables = new ArrayList<>(50);
    }

    public static void main(final String[] args) {
        loadAllLists();
        System.out.println("Some Mock samples:");
        System.out.println("Cities: " + Mocker.getCity() + ", " + Mocker.getCity() + Mocker.getCity() + ", " + Mocker.getCity());
        System.out.println("Companies: " + Mocker.getCompany() + ", " + Mocker.getCompany() + Mocker.getCompany() + ", " + Mocker.getCompany());
        System.out.println("Countries : " + Mocker.getCountry().getName() + ", " + Mocker.getCountry().getName() + ", " + Mocker.getCountry().getName());
        System.out.println("FirstNames(a male, a female)  : " + Mocker.getFirstName(true) + ", " + Mocker.getFirstName(false));
        System.out.println("LastNames: " + Mocker.getLastName() + ", " + Mocker.getLastName());
    }
}
