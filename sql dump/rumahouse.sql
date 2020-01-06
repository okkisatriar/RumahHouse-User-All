-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2018 at 04:27 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rumahouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `master_fasilitas`
--

CREATE TABLE `master_fasilitas` (
  `id` int(10) NOT NULL,
  `fasilitas` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ac` enum('ada','tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `kolam_renang` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `carport` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `garden` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `garasi` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telepon` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pam` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `water_heater` enum('Ada','Tidak','','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `master_foto_produk`
--

CREATE TABLE `master_foto_produk` (
  `id` int(11) NOT NULL,
  `nama_foto` varchar(100) NOT NULL,
  `id_Produk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `master_kategori`
--

CREATE TABLE `master_kategori` (
  `id` int(11) NOT NULL,
  `nama_category` varchar(100) NOT NULL,
  `tanggal_category` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `master_kategori`
--

INSERT INTO `master_kategori` (`id`, `nama_category`, `tanggal_category`) VALUES
(1, 'Rumah', '2018-07-01 00:00:00'),
(2, 'Apartment', '2018-07-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `master_kota`
--

CREATE TABLE `master_kota` (
  `id` int(10) NOT NULL,
  `kota` int(11) NOT NULL,
  `id_provinsi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `master_sertifikat`
--

CREATE TABLE `master_sertifikat` (
  `id` int(11) NOT NULL,
  `sertifikat` int(11) NOT NULL,
  `SHM` int(11) NOT NULL,
  `HGB` int(11) NOT NULL,
  `Lain-Lain` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_status`
--

CREATE TABLE `master_status` (
  `id` int(10) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `master_status`
--

INSERT INTO `master_status` (`id`, `status`) VALUES
(1, 'Di Jual'),
(2, 'Di Kontrakkan'),
(3, 'Terjual'),
(4, 'Terkontrakkan');

-- --------------------------------------------------------

--
-- Table structure for table `master_user_admin`
--

CREATE TABLE `master_user_admin` (
  `id` int(10) NOT NULL,
  `namadepan` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alamat_user_admin` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `handphone` varchar(20) NOT NULL,
  `group` set('admin','user','','') NOT NULL DEFAULT 'user',
  `foto_profile` varchar(100) NOT NULL,
  `waktubuat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `master_user_admin`
--

INSERT INTO `master_user_admin` (`id`, `namadepan`, `username`, `email`, `alamat_user_admin`, `password`, `handphone`, `group`, `foto_profile`, `waktubuat`) VALUES
(1, 'Okki Satria', 'okki', 'othree.okki@gmail.com', 'Rawasari', '12345', '+6281387377741', 'admin', 'PP1.jpg', '2018-09-01 15:02:46'),
(2, 'Erlangga', 'angga', 'erlangga@gmail.com', 'Sudirman ', '12345', '+6284976253126', 'admin', 'PP2.jpg', '2018-09-01 15:02:46'),
(6, 'okki', 'satria', 'okkisatria@gmail.com', 'setia budi', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', '62800000000', 'user', '', '2018-08-25 07:04:43'),
(7, 'Idris Said', 'idris_said', 'idris.said@gmail.com', 'Setia Budi', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', '62800000000', 'user', '', '2018-08-27 01:39:01');

-- --------------------------------------------------------

--
-- Table structure for table `table_addproduk`
--

CREATE TABLE `table_addproduk` (
  `id` int(10) NOT NULL,
  `id_username` varchar(100) DEFAULT NULL,
  `posting` varchar(255) NOT NULL,
  `harga` varchar(50) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `status` int(10) NOT NULL,
  `kategori` int(10) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `foto_produk` varchar(255) NOT NULL,
  `foto_produk2` varchar(255) NOT NULL,
  `foto_produk3` varchar(255) NOT NULL,
  `tanggaldibuat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_addproduk`
--

INSERT INTO `table_addproduk` (`id`, `id_username`, `posting`, `harga`, `alamat`, `status`, `kategori`, `deskripsi`, `foto_produk`, `foto_produk2`, `foto_produk3`, `tanggaldibuat`) VALUES
(1, '2', 'Rumah Idaman Di Kelapa Gading', '4.000.000.000', 'Janur Indah Kelapa Gading', 1, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'RH1.jpg', '', '', '2018-06-30 10:00:00'),
(2, '2', 'Town House Di Tengah Kota', '5.000.000.000', 'Cempaka Putih, Pusat', 1, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'RH2.jpg', '', '', '2018-06-03 10:00:00'),
(4, '2', 'Di Jual Rumah Minimalis Di Jakarta Selatan', '6.000.000.000', 'Bintaro Sektor 9', 1, 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'RH3.jpg', '', '', '2018-05-21 10:00:00'),
(5, '2', 'Rumah Di Kontrakaan 80 jt Di Jakarta Pusat', '8.000.000.000', 'Rawamangun, Jakarta Timur', 1, 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'RH4.jpg', '', '', '2018-05-16 10:00:00'),
(6, '1', 'Rumah Kelapa Gading', '7.000.000.000', 'Kelapa Nias Jakarta Pusat', 2, 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'RH5.jpg', '', '', '2018-08-25 12:32:02'),
(7, '1', 'Rumah Murah Di Pusat Kota', '9.000.000.000', 'Manggarai, Jakarta Pusat', 2, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'RH6.jpg', '', '', '2018-08-25 12:37:11'),
(8, '1', 'Gading Villa 10 Kamar', '10.000.000.000', 'Gading Villa, Kelapa Gading Permai', 1, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'RH7.jpg', '', '', '2018-08-25 12:40:19'),
(10, '2', 'Apartement MOI', '5.000.000.000', 'Kelapa Gading', 2, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'img2.jpg', '', '', '2018-08-27 14:28:25'),
(18, 'undefined', 'Jual Rumah Mewah', '10000', 'Jalan Kaswari', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'ofr.jpg', 'ofr2.jpeg', 'ofr3.jpg', '2018-08-30 10:30:13'),
(19, '1', 'Rumah 4 Lantai', '10000', 'Jalan Lontong', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'img1.jpg', 'img6.jpg', 'img8.jpg', '2018-08-30 10:40:12'),
(20, '1', 'Jual Mahal Di Edit', '10000 Di Edit', 'Jalan Kemuning Di Edit', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'img2.jpg', 'ofr2.jpeg', 'ofr3.jpg', '2018-08-31 00:55:19'),
(21, '1', 'Merah Putih Villaa', '10000000', 'Jalan Suprapto', 2, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'p6.jpg', 'p3.jpg', 'p1.jpg', '2018-08-31 07:30:56');

-- --------------------------------------------------------

--
-- Table structure for table `table_wishlist`
--

CREATE TABLE `table_wishlist` (
  `id` int(11) NOT NULL,
  `id_produk` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_wishlist`
--

INSERT INTO `table_wishlist` (`id`, `id_produk`, `id_user`, `date`) VALUES
(17, '8', 1, '2018-08-31 08:26:28'),
(18, '7', 1, '2018-08-31 08:35:27'),
(19, '2', 1, '2018-08-31 08:45:21'),
(20, '2', 1, '2018-08-31 23:33:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `realname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `waktu_dibuat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `master_fasilitas`
--
ALTER TABLE `master_fasilitas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_foto_produk`
--
ALTER TABLE `master_foto_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Produk` (`id_Produk`);

--
-- Indexes for table `master_kategori`
--
ALTER TABLE `master_kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_kota`
--
ALTER TABLE `master_kota`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_provinsi` (`id_provinsi`);

--
-- Indexes for table `master_sertifikat`
--
ALTER TABLE `master_sertifikat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_status`
--
ALTER TABLE `master_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_user_admin`
--
ALTER TABLE `master_user_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_addproduk`
--
ALTER TABLE `table_addproduk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_wishlist`
--
ALTER TABLE `table_wishlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `master_foto_produk`
--
ALTER TABLE `master_foto_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_kategori`
--
ALTER TABLE `master_kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_kota`
--
ALTER TABLE `master_kota`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_status`
--
ALTER TABLE `master_status`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `master_user_admin`
--
ALTER TABLE `master_user_admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `table_addproduk`
--
ALTER TABLE `table_addproduk`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `table_wishlist`
--
ALTER TABLE `table_wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `master_foto_produk`
--
ALTER TABLE `master_foto_produk`
  ADD CONSTRAINT `master_foto_produk_ibfk_1` FOREIGN KEY (`id_Produk`) REFERENCES `table_produk` (`id`);

--
-- Constraints for table `master_kota`
--
ALTER TABLE `master_kota`
  ADD CONSTRAINT `master_kota_ibfk_1` FOREIGN KEY (`id_provinsi`) REFERENCES `master_provinsi` (`id`),
  ADD CONSTRAINT `master_kota_ibfk_2` FOREIGN KEY (`id_provinsi`) REFERENCES `table_produk` (`id_Kota`),
  ADD CONSTRAINT `master_kota_ibfk_3` FOREIGN KEY (`id_provinsi`) REFERENCES `master_provinsi` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
