package main

import (
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// SignerData mendefinisikan struktur data penandatangan
type SignerData struct {
	SignerAddInfo  string
	SignerName     string
	SignerPosition string
	SignerQR       string
	SignerImage    string
}

// PropertyData mendefinisikan informasi properti
type PropertyData struct {
	Name       string
	LogoURL    string
	Address    string
	Email      string
	Phone      string
	HeaderNote string
	FooterNote string
}

// FlagContentData mendefinisikan konten utama dokumen Flag
type FlagContentData struct {
	DocumentTitle string
	FlagDate      string
	StayPeriod    string
	StayDuration  string
	Room          string
	GuestName     string
	GuestHouse    string
	Status        string
	Urgent        string
	CreatedBy     string
	CreatedAt     string
	ClosedBy      string
	ClosedAt      string
	Note          string
	Items         []string
	PrintedBy     string
	PrintedAt     string
}

// FlagReportData mendefinisikan struct utama untuk laporan Flag
type FlagReportData struct {
	Property  PropertyData
	Data      FlagContentData
	Signature []SignerData
}

func main() {
	// 1. Simulasikan string Base64 murni yang didapatkan dari database atau generator QR
	// rawBase64 := "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–"

	// Definisikan struct data
	data := FlagReportData{
		Property: PropertyData{
			Name:       "Property Developer Inc.",
			LogoURL:    "https://asset.dsisistem.top/image_testing/002aceacbc204645b91ec518a24bd392.webp",
			Address:    "Jl. Kaliurang Km. 12 Dekat UII, Sleman, Yogyakarta",
			Email:      "support@propertydeveloper.com",
			Phone:      "08123456789",
			HeaderNote: "Catatan Header: Harap segera tindak lanjuti jika status Flag masih aktif.",
			FooterNote: "Catatan: Dokumen flag internal untuk staf pengawas operasional.",
		},
		Data: FlagContentData{
			DocumentTitle: "Flag",
			FlagDate:      "18 Jun 2026",
			StayPeriod:    "18 Jun - 20 Jun 2026",
			StayDuration:  "2 Nights",
			Room:          "Room 202",
			GuestName:     "Arlene McCoy",
			GuestHouse:    "In House",
			Status:        "Closed",
			Urgent:        "Yes",
			CreatedBy:     "Superadmin",
			CreatedAt:     "18 Jun 2026",
			ClosedBy:      "Admin",
			ClosedAt:      "19 Jun 2026 09:00",
			Note:          "Tamu memiliki catatan keterlambatan pembayaran deposit untuk masa inap tambahan. Mohon konfirmasi sebelum check-out.",
			Items: []string{
				"Late Deposit Payment",
				"Extra Towel Request Pending",
				"Special Food Allergy Notification",
			},
			PrintedBy: "Superadmin",
			PrintedAt: time.Now().Format("02 Jan 2006 15:04:05 MST"),
		},
		Signature: []SignerData{
			{SignerAddInfo: "Prepared by", SignerName: "User", SignerPosition: "Staff In Charge"},
			{SignerAddInfo: "Acknowledge by", SignerName: "Windah Basudara", SignerPosition: "Asst. FOM", SignerImage: "https://asset.dsisistem.top/image_testing/0b824059c781489ab12759491f5163ec.webp"},
		},
	}

	// Parse template HTML dengan mendaftarkan helper function qrCodeAttr
	funcMap := template.FuncMap{
		"qrCodeAttr": func(base64Str string) template.HTMLAttr {
			// Hilangkan space, newline, dan carriage return
			cleanStr := strings.ReplaceAll(base64Str, "\n", "")
			cleanStr = strings.ReplaceAll(cleanStr, "\r", "")
			cleanStr = strings.ReplaceAll(cleanStr, " ", "")

			if cleanStr == "" {
				return template.HTMLAttr("")
			}

			// Cek jika sudah memiliki format data URI
			if strings.HasPrefix(cleanStr, "data:") {
				return template.HTMLAttr(fmt.Sprintf(`src="%s"`, cleanStr))
			}

			// Tentukan mime type berdasarkan prefix base64
			mimeType := "image/png" // default
			if strings.HasPrefix(cleanStr, "PHN2Zy") {
				mimeType = "image/svg+xml"
			} else if strings.HasPrefix(cleanStr, "/9j/") {
				mimeType = "image/jpeg"
			}

			return template.HTMLAttr(fmt.Sprintf(`src="data:%s;base64,%s"`, mimeType, cleanStr))
		},
	}

	tmplFile := "export_flag/export_flag.html"
	outFile := "export_flag/output_flag.html"

	tmpl, err := template.New(filepath.Base(tmplFile)).Funcs(funcMap).ParseFiles(tmplFile)
	if err != nil {
		panic(err)
	}

	// Buat file output hasil compile
	outputFile, err := os.Create(outFile)
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	// Bind data ke dalam template dan tulis hasilnya ke file output
	err = tmpl.Execute(outputFile, data)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Simulasi sukses: %s -> %s\n", tmplFile, outFile)
}
