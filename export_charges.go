package main

import (
	"html/template"
	"os"
	"time"
)

// ProductItem mendefinisikan struct untuk setiap item produk di tabel
type ProductItem struct {
	No      int
	Product string
	Qty     string
	Price   string
	Nett    string
	Service string
	Tax     string
	Gross   string
}

// ChargesData mendefinisikan struct yang sesuai dengan variabel di export_charges.html
type ChargesData struct {
	LogoURL        string
	CompanyName    string
	CompanyAddress string
	CompanyEmail   string
	CompanyPhone   string
	HeaderNote     string
	DocumentID     string
	GuestName      string
	RoomNumber     string
	PackageName    string
	Type           string
	Qty            string
	Price          string
	User           string
	Note           string
	Amount         string
	PrintedBy      string
	PrintedAt      string
	PropertyNote   string

	// Fields untuk list produk
	Products     []ProductItem
	TotalPrice   string
	TotalNett    string
	TotalService string
	TotalTax     string
	TotalGross   string
}

func main() {
	// 1. Simulasikan list produk sesuai gambar reference
	products := []ProductItem{
		{
			No:      1,
			Product: "Late Checkout Fee",
			Qty:     "2.00",
			Price:   "100,000",
			Nett:    "95,200.10",
			Service: "4,761.10",
			Tax:     "0.00",
			Gross:   "100,000",
		},
		{
			No:      2,
			Product: "Laundry Service",
			Qty:     "1.00",
			Price:   "20,000",
			Nett:    "18,200.10",
			Service: "2,761.10",
			Tax:     "0.00",
			Gross:   "20,000",
		},
	}

	// 2. Definisikan struct data
	data := ChargesData{
		LogoURL:        "https://i.ibb.co.com/ZzT4SJn5/logo-bigdeals.png",
		CompanyName:    "Property Developer Inc.",
		CompanyAddress: "Jl. Kaliurang Km. 12 Dekat UII, Sleman, Yogyakarta",
		CompanyEmail:   "support@propertydeveloper.com",
		CompanyPhone:   "08123456789",
		HeaderNote:     "Catatan Header: Harap konfirmasi pembayaran ke WhatsApp jika belum terverifikasi.",
		DocumentID:     "Family Stay Package",
		GuestName:      "Arlene McCoy",
		RoomNumber:     "104",
		PackageName:    "Standard Package",
		Type:           "Charges",
		Qty:            "3.00",
		Price:          "120,000",
		User:           "John Doe",
		Note:           "Product charges for Room 104 stay period.",
		Amount:         "120,000",
		PrintedBy:      "Superadmin",
		PrintedAt:      time.Now().Format("02 Jan 2006 15:04:05 MST"),
		PropertyNote:   "Catatan: Dokumen ini diterbitkan secara elektronik dan sah tanpa tanda tangan basah. Pembayaran yang sudah dilakukan tidak dapat dibatalkan atau dikembalikan dengan alasan apapun.",

		Products:     products,
		TotalPrice:   "120,000",
		TotalNett:    "113,400.20",
		TotalService: "7,522.20",
		TotalTax:     "0.00",
		TotalGross:   "120,000",
	}

	// 3. Parse template HTML
	tmpl, err := template.ParseFiles("export_charges.html")
	if err != nil {
		panic(err)
	}

	// 4. Buat file output hasil compile
	outputFile, err := os.Create("output_charges.html")
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	// 5. Bind data ke dalam template dan tulis hasilnya ke file output
	err = tmpl.Execute(outputFile, data)
	if err != nil {
		panic(err)
	}

	println("Simulasi sukses! Silakan buka 'output_charges.html' di browser Anda.")
}
