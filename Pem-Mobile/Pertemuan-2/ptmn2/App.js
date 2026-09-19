import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
  Platform,
  Linking,
} from 'react-native';

// --- PALET WARNA (DARI GAMBAR) ---
const COLORS = {
  bg: '#0f0f1a', // latar belakang
  card: '#1a1a2e', // kartu/panel
  cardBorder: '#2d2d44', // border kartu
  accent: '#7c3aed', // ungu utama
  accentLight: '#a78bfa', // ungu muda
  accentGold: '#f59e0b', // emas
  text: '#f0f0f0', // teks utama
  textMuted: '#9ca3af', // teks redup
  textDim: '#6b7280', // teks sangat redup
  success: '#4ade80', // hijau
  white: '#ffffff',
};

const PROFILE = {
  name: 'Adam Fadli',
  title: 'Web Developer',
  email: 'adamfadli997@gmail.com',
  phone: '085794403493',
  location: 'Kuningan, Indonesia',
  bio: 'Menjadi seseorang yang bermanfaat bagi nusa dan bangsa',
  avatar: require('./assets/foto aing kmj bds.jpg'), // Fallback URL gambar
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61dafb' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript', level: 88, color: '#f7df1e' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178c6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 85, color: '#FFCA28' },
  { id: '7', name: 'Tailwind CSS', level: 95, color: '#06B6D6' },
];

const SECTIONS = [
  {
    title: '💼 Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Senior Web Developer',
        company: 'PT. ABC Teknologi',
        period: '2020 - sekarang',
        desc: 'Memimpin tim pengembangan aplikasi web menggunakan React dan Node.js, serta berkolaborasi dengan tim desain dan backend untuk menciptakan pengalaman pengguna yang optimal.',
      },
      {
        id: 'e2',
        role: 'Web Developer',
        company: 'PT. XYZ Solusi Digital',
        period: '2018 - 2020',
        desc: 'Mengembangkan dan memelihara aplikasi web menggunakan React dan Node.js, serta berkontribusi dalam perencanaan dan implementasi fitur baru.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'p1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - sekarang',
        desc: 'Memperoleh gelar sarjana di bidang informatika dengan mendapatkan IPK yang bagus.',
      },
    ],
  },
];

const SOCIAL = [
  { id: 's1', name: 'Github', icon: '⏰', url: 'https://github.com/adamfadli05' },
  { id: 's2', name: 'LinkedIn', icon: '📩', url: 'https://www.linkedin.com/in/adam-fadli-512a46431/' },
  { id: 's3', name: 'YouTube', icon: '🎬', url: 'https://www.youtube.com/@adamfadli4591' },
];

const CORE_COMPONENTS = [
  {
    id: '1',
    name: 'View',
    desc: 'Container layout utama',
  },
  {
    id: '2',
    name: 'Text',
    desc: 'Menampilkan teks (nama, bio, dll)',
  },
  {
    id: '3',
    name: 'Image',
    desc: 'Foto profil dari URL / lokal',
  },
  {
    id: '4',
    name: 'ScrollView',
    desc: 'Scroll seluruh halaman CV',
  },
  {
    id: '5',
    name: 'FlatList',
    desc: 'Daftar skill (keahlian)',
  },
  {
    id: '6',
    name: 'SectionList',
    desc: 'Pengalaman & Pendidikan',
  },
  {
    id: '7',
    name: 'TextInput',
    desc: 'Form kontak (nama & pesan)',
  },
  {
    id: '8',
    name: 'Button',
    desc: 'Tombol kirim pesan',
  },
  {
    id: '9',
    name: 'TouchableOpacity',
    desc: 'Tombol sosial & timeline',
  },
  {
    id: '10',
    name: 'Pressable',
    desc: 'Tombol Download PDF',
  },
  {
    id: '11',
    name: 'Switch',
    desc: 'Toggle Open to Work',
  },
  {
    id: '12',
    name: 'Modal',
    desc: 'Popup detail pengalaman',
  },
  {
    id: '13',
    name: 'ActivityIndicator',
    desc: 'Loading kirim pesan',
  },
  {
    id: '14',
    name: 'StatusBar',
    desc: 'Warna status bar',
  },
  {
    id: '15',
    name: 'SafeAreaView',
    desc: 'Area aman perangkat',
  },
  {
    id: '16',
    name: 'StyleSheet',
    desc: 'Semua styling terpusat',
  },
];

// --- SUB-COMPONENT: SkillCard (Gambar 26) ---
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    {/* Baris atas: nama + persentase */}
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>

    {/* Progress bar: View berlapis */}
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          // width dinamis dari data, warna dari data
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

// --- SUB-COMPONENT: TimelineCard (Gambar 26) ---
const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75} // opacity saat ditekan (0-1)
  >
    {/* Titik bulat di sebelah kiri (dekorasi timeline) */}
    <View style={styles.timelineDot} />

    {/* Konten teks */}
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pressing, setPressing] = useState(false);

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim!`);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.bg} barStyle="light-content" />

      {/* HEADER BAR */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: COLORS.textDim, true: COLORS.success }}
            thumbColor={openToWork ? COLORS.white : '#aaa'}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* PROFIL SECTION */}
        <View style={styles.profileSection}>
          <Image source={PROFILE.avatar} style={styles.avatar} />

          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✅ Open to Work</Text>
            </View>
          )}

          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
            <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>
          </View>

          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.socialBtn}
                onPress={async () => {
  try {
    const supported = await Linking.canOpenURL(s.url);

    if (supported) {
      await Linking.openURL(s.url);
    } else {
      Alert.alert('Error', 'Link tidak dapat dibuka');
    }
  } catch (error) {
    Alert.alert('Error', 'Gagal membuka link');
  }
}}
                activeOpacity={0.8}
              >
                <Text style={styles.socialIcon}>{s.icon}</Text>
                <Text style={styles.socialLabel}>{s.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.downloadBtn,
              pressed && styles.downloadBtnPressed,
            ]}
            onPressIn={() => setPressing(true)}
            onPressOut={() => setPressing(false)}
            onPress={() => Alert.alert('⬇️ Download', 'CV sedang diunduh...')}
          >
            <Text style={styles.downloadBtnText}>
              {pressing ? '⌛ Mengunduh...' : '⬇️ Download CV (PDF)'}
            </Text>
          </Pressable>
        </View>

        {/* SECTION KEAHLIAN (FLATLIST) */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>🛠 Keahlian</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ FlatList: menampilkan list data secara efisien
          </Text>

          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SkillCard item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </View>

        {/* SECTION RIWAYAT (SECTIONLIST) */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>📋 Riwayat</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
          </Text>

          <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TimelineCard item={item} onPress={handleCardPress} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>

        {/* SECTION 16 CORE COMPONENTS */}
<View style={styles.sectionBox}>
  <Text style={styles.sectionTitle}>
    🧩 16 Core Components yang Digunakan
  </Text>

  <Text style={styles.sectionSubtitle}>
    ↳ Komponen React Native yang digunakan dalam aplikasi CV ini
  </Text>

  <View style={styles.coreList}>
    {CORE_COMPONENTS.map((item, index) => (
      <View key={item.id} style={styles.coreItem}>
        <View style={styles.coreNumber}>
          <Text style={styles.coreNumberText}>
            {index + 1}
          </Text>
        </View>

        <View style={styles.coreContent}>
          <Text style={styles.coreName}>
            {item.name}
          </Text>

          <Text style={styles.coreDesc}>
            {item.desc}
          </Text>
        </View>
      </View>
    ))}
  </View>
</View>

        {/* SECTION HUBUNGI SAYA */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>✉️ Hubungi Saya</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ TextInput, Button, ActivityIndicator
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Nama Anda"
            placeholderTextColor={COLORS.textDim}
            value={senderName}
            onChangeText={setSenderName}
            returnKeyType="next"
            editable={!sending}
          />

          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Tulis pesan Anda di sini..."
            placeholderTextColor={COLORS.textDim}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!sending}
          />

          {sending ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="large" color={COLORS.accent} />
              <Text style={styles.loadingText}>Mengirim pesan...</Text>
            </View>
          ) : (
            <Button
              title="📩 Kirim Pesan"
              color={COLORS.accent}
              onPress={handleSend}
            />
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* MODAL DETAIL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- STYLESHEET (GABUNGAN LENGKAP DARI SELURUH GAMBAR) ---
const styles = StyleSheet.create({
    // 16 CORE COMPONENTS
  coreList: {
    marginTop: 4,
  },

  coreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  coreNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  coreNumberText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '800',
  },

  coreContent: {
    flex: 1,
  },

  coreName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },

  coreDesc: {
    color: COLORS.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
  // LAYOUT DASAR
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },

  // HEADER BAR
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // PROFILE SECTION
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  // SOCIAL ROW & BTN
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },

  // DOWNLOAD BTN
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // SECTION BOX, TITLE, SUBTITLE
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  // SECTION HEADER & TEXT
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

  // SKILL CARD STYLES (DARI GAMBAR 20)
  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 13,
  },
  skillPercent: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden', // clip anak yang melampaui batas
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
    // width & backgroundColor diset secara inline (dinamis dari data)
  },

  // TIMELINE CARD STYLES (DARI GAMBAR 19)
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineRole: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },
  timelineCompany: {
    color: COLORS.accentLight,
    fontSize: 13,
    marginBottom: 2,
  },
  timelinePeriod: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 6,
  },
  timelineHint: {
    color: COLORS.accentGold,
    fontSize: 11,
    fontStyle: 'italic',
  },

  // FORM & INPUT STYLES (DARI GAMBAR 18 & 17)
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10, // Platform.OS membedakan iOS dan Android
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // teks mulai dari atas (Android)
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },

  // MODAL STYLES (DARI GAMBAR 16)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)', // hitam transparan
    justifyContent: 'flex-end', // konten di bawah
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalCompany: {
    color: COLORS.accentLight,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalPeriod: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginBottom: 16,
  },
  modalDesc: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
});