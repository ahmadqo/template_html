package main

import (
	"html/template"
	"os"
	"time"
)

// FlagData mendefinisikan struct yang sesuai dengan variabel di export_flag.html
type FlagData struct {
	LogoURL        string
	CompanyName    string
	CompanyAddress string
	CompanyEmail   string
	CompanyPhone   string
	HeaderNote     string
	FlagDate       string
	StayPeriod     string
	StayDuration   string
	Room           string
	GuestName      string
	GuestHouse     string
	Status         string
	Urgent         string
	CreatedBy      string
	CreatedAt      string
	ClosedBy       string
	ClosedAt       string
	Note           string
	Items          []string
	PrintedBy      string
	PrintedAt      string
	PropertyNote   string
}

func main() {
	// Definisikan struct data
	data := FlagData{
		LogoURL:        "https://i.ibb.co.com/ZzT4SJn5/logo-bigdeals.png",
		CompanyName:    "Property Developer Inc.",
		CompanyAddress: "Jl. Kaliurang Km. 12 Dekat UII, Sleman, Yogyakarta",
		CompanyEmail:   "support@propertydeveloper.com",
		CompanyPhone:   "08123456789",
		HeaderNote:     "Catatan Header: Harap segera tindak lanjuti jika status Flag masih aktif.",
		FlagDate:       "18 Jun 2026",
		StayPeriod:     "18 Jun - 20 Jun 2026",
		StayDuration:   "2 Nights",
		Room:           "Room 202",
		GuestName:      "Arlene McCoy",
		GuestHouse:     "In House",
		Status:         "Closed",
		Urgent:         "Yes",
		CreatedBy:      "Superadmin",
		CreatedAt:      "18 Jun 2026",
		ClosedBy:       "Admin",
		ClosedAt:       "19 Jun 2026 09:00",
		Note:           "Tamu memiliki catatan keterlambatan pembayaran deposit untuk masa inap tambahan. Mohon konfirmasi sebelum check-out.",
		Items: []string{
			"Late Deposit Payment",
			"Extra Towel Request Pending",
			"Special Food Allergy Notification",
		},
		PrintedBy:    "Superadmin",
		PrintedAt:    time.Now().Format("02 Jan 2006 15:04:05 MST"),
		PropertyNote: "Catatan: Dokumen flag internal untuk staf pengawas operasional.",
	}

	tmpl, err := template.ParseFiles("export_flag.html")
	if err != nil {
		panic(err)
	}

	// Buat file output hasil compile
	outputFile, err := os.Create("output_flag.html")
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	// Bind data ke dalam template dan tulis hasilnya ke file output
	err = tmpl.Execute(outputFile, data)
	if err != nil {
		panic(err)
	}

	println("Simulasi sukses! Silakan buka 'output_flag.html' di browser Anda.")
}
